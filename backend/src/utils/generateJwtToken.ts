import jwt from "jsonwebtoken";

const PUBLIC_JWT_KEY = process.env.PUBLIC_JWT_KEY as string;
const PRIVATE_JWT_KEY = process.env.PRIVATE_JWT_KEY as string;

export const generateAccessToken = (userId: string, isAdmin: boolean) => {
  return jwt.sign({ userId, isAdmin }, PUBLIC_JWT_KEY, {
    expiresIn: "1hr",
  });
};

export const generateRefreshToken = (userId: string, isAdmin: boolean) => {
  return jwt.sign({ userId, isAdmin }, PRIVATE_JWT_KEY, {
    expiresIn: "1d",
  });
};
