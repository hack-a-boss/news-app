const {
  insertNewsItem,
  selectNewsItemById,
} = require("../../repositories/news");
const { postNewsItemSchema } = require("../../schemas/news");
const { processAndSaveImage } = require("../../utils");

const postNewsItem = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    await postNewsItemSchema.validateAsync(req.body);

    const newsItem = { ...req.body, ownerId: loggedUserId, photo: null };

    const newsItemPhoto = req.files?.photo;

    if (newsItemPhoto) {
      newsItem.photo = await processAndSaveImage(newsItemPhoto.data, "photos");
    }

    const insertedNewsItemId = await insertNewsItem(newsItem);

    const createdNewsItem = await selectNewsItemById(
      insertedNewsItemId,
      loggedUserId
    );

    res.status(201).send({
      status: "ok",
      data: createdNewsItem,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postNewsItem;
