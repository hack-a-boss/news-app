const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const generateError = require("./generateError");
const fs = require("fs").promises;

const processAndSaveImage = async (imageBuffer, saveToFolder) => {
  try {
    const saveToPath = path.join(
      __dirname,
      "..",
      process.env.UPLOADS_DIR,
      saveToFolder
    );

    await fs.mkdir(saveToPath, { recursive: true });

    const image = sharp(imageBuffer);

    const imageMetadata = await image.metadata();

    if (imageMetadata.width > 1000) {
      image.resize(1000);
    }

    const imageName = `${uuid.v4()}.${imageMetadata.format}`;

    const imagePath = path.join(saveToPath, imageName);

    await image.toFile(imagePath);

    return imageName;
  } catch (error) {
    generateError("There was an error processing the image", 500);
  }
};

module.exports = processAndSaveImage;
