const {
  selectNewsItemById,
  updateNewsItem,
} = require("../../repositories/news");
const { newsItemIdSchema, editNewsItemSchema } = require("../../schemas/news");
const {
  generateError,
  processAndSaveImage,
  deleteImage,
} = require("../../utils");

const editNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await newsItemIdSchema.validateAsync(id);

    const loggedUserId = req.auth.id;

    const newsItem = await selectNewsItemById(id, loggedUserId);

    if (!newsItem) {
      generateError("The post you are trying to update doesn't exist", 404);
    }

    if (newsItem.ownerId !== loggedUserId) {
      generateError("You don't have rights to edit this post", 401);
    }

    const newsItemPhoto = req.files?.photo;

    if (newsItemPhoto) {
      await editNewsItemSchema.min(0).validateAsync(req.body);
    } else {
      if ("photo" in req.body) {
        generateError("Photo file is corrupted");
      }

      await editNewsItemSchema.validateAsync(req.body);
    }

    if (newsItemPhoto) {
      newsItem.photo && (await deleteImage(newsItem.photo, "photos"));
      newsItem.photo = await processAndSaveImage(newsItemPhoto.data, "photos");
    }

    const updatedNewsItem = { ...newsItem, ...req.body };

    await updateNewsItem(updatedNewsItem);

    res.status(200).send({ status: "ok", data: updatedNewsItem });
  } catch (error) {
    next(error);
  }
};

module.exports = editNewsItem;
