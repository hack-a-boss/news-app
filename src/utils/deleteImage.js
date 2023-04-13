const path = require("path");
const generateError = require("./generateError");
const fs = require("fs").promises;

const deleteImage = async (imageName, imageFolder) => {
  try {
    const imagePath = path.join(
      __dirname,
      "..",
      process.env.UPLOADS_DIR,
      imageFolder,
      imageName
    );

    await fs.rm(imagePath);
  } catch (error) {
    generateError("There was an error deleting the image", 500);
  }
};

module.exports = deleteImage;
