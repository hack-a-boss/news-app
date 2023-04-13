const {
  selectVote,
  insertVote,
  deleteVote,
} = require("../../repositories/votes");
const { selectNewsItemById } = require("../../repositories/news");
const { newsItemIdSchema } = require("../../schemas/news");
const { generateError } = require("../../utils");

const likeNewsItem = async (req, res, next) => {
  try {
    const { id: newsItemId } = req.params;

    await newsItemIdSchema.validateAsync(newsItemId);

    const loggedUserId = req.auth.id;

    const newsItem = await selectNewsItemById(newsItemId, loggedUserId);

    if (!newsItem) {
      generateError("The news item you are trying to like does not exist", 404);
    }

    const likeToInsert = {
      newsItemId,
      userId: loggedUserId,
      type: "like",
    };

    const likeAlreadyExists = await selectVote(likeToInsert);

    if (likeAlreadyExists) {
      await deleteVote(likeToInsert);
      newsItem.likes--;
      newsItem.likedByLoggedUser = 0;
    } else {
      const dislikeToDelete = {
        ...likeToInsert,
        type: "dislike",
      };

      const dislikeAlreadyExists = await selectVote(dislikeToDelete);

      if (dislikeAlreadyExists) {
        await deleteVote(dislikeToDelete);
        newsItem.dislikes--;
        newsItem.dislikedByLoggedUser = 0;
      }

      await insertVote(likeToInsert);
      newsItem.likes++;
      newsItem.likedByLoggedUser = 1;
    }

    res.status(200).send({ status: "ok", data: newsItem });
  } catch (error) {
    next(error);
  }
};

module.exports = likeNewsItem;
