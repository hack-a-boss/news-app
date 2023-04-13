const {
  selectVote,
  insertVote,
  deleteVote,
} = require("../../repositories/votes");
const { selectNewsItemById } = require("../../repositories/news");
const { newsItemIdSchema } = require("../../schemas/news");
const { generateError } = require("../../utils");

const dislikeNewsItem = async (req, res, next) => {
  try {
    const { id: newsItemId } = req.params;

    await newsItemIdSchema.validateAsync(newsItemId);

    const loggedUserId = req.auth.id;

    const newsItem = await selectNewsItemById(newsItemId, loggedUserId);

    if (!newsItem) {
      generateError(
        "The news item you are trying to dislike does not exist",
        404
      );
    }

    const dislikeToInsert = {
      newsItemId,
      userId: loggedUserId,
      type: "dislike",
    };

    const dislikeAlreadyExists = await selectVote(dislikeToInsert);

    if (dislikeAlreadyExists) {
      await deleteVote(dislikeToInsert);
      newsItem.dislikes--;
      newsItem.dislikedByLoggedUser = 0;
    } else {
      const likeToDelete = {
        ...dislikeToInsert,
        type: "like",
      };

      const likeAlreadyExists = await selectVote(likeToDelete);

      if (likeAlreadyExists) {
        await deleteVote(likeToDelete);
        newsItem.likes--;
        newsItem.likedByLoggedUser = 0;
      }

      await insertVote(dislikeToInsert);
      newsItem.dislikes++;
      newsItem.dislikedByLoggedUser = 1;
    }

    res.status(200).send({ status: "ok", data: newsItem });
  } catch (error) {
    next(error);
  }
};

module.exports = dislikeNewsItem;
