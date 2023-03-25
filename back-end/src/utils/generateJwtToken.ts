import jwt from "jsonwebtoken";

const PUBLIC_JWT_KEY = process.env.PUBLIC_JWT_KEY as string;
const PRIVATE_JWT_KEY = process.env.PRIVATE_JWT_KEY as string;

export const generateAccessToken = (
  userId: string,
  favoritesId: string | undefined
) => {
  return jwt.sign({ userId, favoritesId }, PUBLIC_JWT_KEY, {
    expiresIn: "1hr",
  });
};

export const generateRefreshToken = (
  userId: string,
  favoritesId: string | undefined
) => {
  return jwt.sign({ userId, favoritesId }, PRIVATE_JWT_KEY, {
    expiresIn: "1d",
  });
};
