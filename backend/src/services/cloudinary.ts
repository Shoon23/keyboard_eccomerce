const cloudinary = require("cloudinary").v2;

export default function cloudinaryConn() {
  const CLOUD_NAME = process.env.CLOUD_NAME as string;
  const CLOUD_API_KEY = process.env.CLOUD_API_KEY as string;
  const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET as string;

  cloudinary.config({
    CLOUD_NAME,
    CLOUD_API_KEY,
    CLOUD_API_SECRET,
  });

  return cloudinary;
}
