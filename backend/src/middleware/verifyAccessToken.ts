import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;
  const PUBLIC_JWT_KEY = process.env.PUBLIC_JWT_KEY as string;
  const accessToken = bearerToken?.split(" ")[1] as string;

  try {
    jwt.verify(accessToken, PUBLIC_JWT_KEY);
    console.log(accessToken);
    // res.locals.userId = decoded.userId;
    // res.locals.favoritesId = decoded.favoritesId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Something Went Wrong",
      status: "expired refresh token",
    });
  }
}
