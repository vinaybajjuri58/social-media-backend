const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const imageUploadHandler = async (req, res) => {
  const image = req.body.image;
  try {
    const result = await cloudinary.uploader.upload(image);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error in uploading Image",
    });
  }
};
module.exports = {
  imageUploadHandler,
};
