import { Request, Response } from "express";
import prisma from "../prisma";
import { iUserDetails } from "../types";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default {
  async registerController(req: Request, res: Response) {
    const userDetails: iUserDetails = req.body;
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
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
          email: userDetails.email,
          password: hashPasswrod,
        },
      });

      const { password, ...details } = createUser;

      res.status(201).json(details);
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

      const { password, ...details } = isUserExist;

      res.status(200).json(details);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
};
