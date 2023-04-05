const cloudinary = require("cloudinary").v2;

const cloud_name = process.env.CLOUD_NAME as string;
const cloud_api_key = process.env.CLOUD_API_KEY as string;
const cloud_api_secret = process.env.CLOUD_API_SECRET as string;

export default cloudinary.config({
  cloud_name: cloud_name,
  cloud_api_key: cloud_api_key,
  cloud_api_secret: cloud_api_secret,
});
