const cloudinary = require("cloudinary").v2;

export default function cloudinaryConn() {
  const cloud_name = process.env.CLOUD_NAME as string;
  const cloud_api_key = process.env.CLOUD_API_KEY as string;
  const cloud_api_secret = process.env.CLOUD_API_SECRET as string;

  cloudinary.config({
    cloud_name,
    cloud_api_key,
    cloud_api_secret,
  });

  return cloudinary;
}
