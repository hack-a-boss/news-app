const {
  selectNewsItemById,
  removeNewsItem,
} = require("../../repositories/news");
const { newsItemIdSchema } = require("../../schemas/news");
const { generateError } = require("../../utils");

const deleteNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await newsItemIdSchema.validateAsync(id);

    const loggedUserId = req.auth.id;

    const newsItem = await selectNewsItemById(id, loggedUserId);

    if (!newsItem) {
      generateError("News item doesn't exist", 404);
    }

    if (newsItem.ownerId !== loggedUserId) {
      generateError("You don't have rights to delete this news item", 403);
    }

    await removeNewsItem(id);

    res.status(200).send({ status: "ok", message: "News item deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteNewsItem;
