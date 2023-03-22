const cloudinary = require("cloudinary").v2;

export default function cloudinaryConn() {
  cloudinary.config({
    cloud_name: "dkarsw8bs",
    api_key: "827135147154243",
    api_secret: "rt4nbskpN7AEzO1MizUH2nP-vpI",
  });

  cloudinary.uploader.upload();

  return cloudinary;
}
