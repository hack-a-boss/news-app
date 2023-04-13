const { selectNewsItemById } = require("../../repositories/news");
const { newsItemIdSchema } = require("../../schemas/news");
const { generateError } = require("../../utils");
const jwt = require("jsonwebtoken");

const getNewsItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await newsItemIdSchema.validateAsync(id);

    const { authorization } = req.headers;

    if (authorization) {
      const [type, token] = authorization.split(" ");

      if (type !== "Bearer" || !token) {
        generateError("Invalid token format", 401);
      }

      req.auth = jwt.verify(token, process.env.JWT_SECRET);
    }

    const newsItem = await selectNewsItemById(id, req.auth?.id);

    if (!newsItem) {
      generateError("News item doesn't exist", 404);
    }

    res.status(200).send({ status: "ok", data: newsItem });
  } catch (error) {
    next(error);
  }
};

module.exports = getNewsItem;
