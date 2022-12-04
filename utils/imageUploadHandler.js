const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const imageUploadHandler = async (userImage) => {
  const image = userImage;
  try {
    const result = await cloudinary.uploader.upload(image);
    return result.url;
  } catch (err) {
    throw new Error("Error in uploading image");
  }
};
module.exports = {
  imageUploadHandler,
};
