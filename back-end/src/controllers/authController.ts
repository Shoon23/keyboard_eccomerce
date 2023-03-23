import { Request, Response } from "express";
import prisma from "../prisma";
import { iUserDetails } from "../types";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateJwtToken";

export default {
  async registerController(req: Request, res: Response) {
    const userDetails: iUserDetails = req.body;
    const saltRounds = 10;

    try {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: userDetails.email,
        },
      });

      if (isUserExist) {
        return res.status(303).json({
          message: "User Already Exist",
        });
      }

      const hashPasswrod = await bcrypt.hash(userDetails.password, saltRounds);

      const createUser = await prisma.user.create({
        data: {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          password: hashPasswrod,
        },
      });

      const createCart = await prisma.cart.create({
        data: {
          userId: createUser.userId,
        },
      });

      const accessToken = generateAccessToken(createUser.userId);
      const refreshToken = generateRefreshToken(createUser.userId);

      const { password, ...details } = createUser;

      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res
        .status(201)
        .json({ ...details, cartId: createCart.cartId, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
  async loginController(req: Request, res: Response) {
    const useDetails: iUserDetails = req.body;
    try {
      const isUserExist = await prisma.user.findUnique({
        where: {
          email: useDetails.email,
        },
        include: {
          cartId: true,
        },
      });

      if (!isUserExist) {
        return res.status(303).json({
          message: "User Not Yet Registered",
        });
      }
      const isPassword = await bcrypt.compare(
        useDetails.password,
        isUserExist.password
      );
      if (!isPassword) {
        return res.status(401).json({
          message: "Wrong Password",
        });
      }
      const { password, cartId, ...details } = isUserExist;
      const accessToken = generateAccessToken(isUserExist.userId);
      const refreshToken = generateRefreshToken(isUserExist.userId);

      res.cookie("refreshToken", refreshToken, { httpOnly: true });

      res.status(200).json({ ...details, cartId: cartId?.cartId, accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
  async refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const PRIVATE_JWT_KEY = process.env.PRIVATE_JWT_KEY as string;

    try {
      const verifyToken: any = jwt.verify(refreshToken, PRIVATE_JWT_KEY);
      const userId = verifyToken.userId;

      const getUser = await prisma.user.findUnique({
        where: {
          userId,
        },
        include: {
          cartId: true,
        },
      });

      if (!getUser) {
        return res.status(303).json({
          message: "User Not Yet Registered",
        });
      }

      const { password, cartId, ...details } = getUser;
      const newAccessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

      res
        .status(200)
        .json({
          ...details,
          cartId: cartId?.cartId,
          accessToken: newAccessToken,
        });
    } catch (error: any) {
      res.status(403).json({
        message: "User not authorosize",
      });
    }
  },
};
