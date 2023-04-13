const { selectNews } = require("../../repositories/news");
const { themesSchema } = require("../../schemas/news");
const jwt = require("jsonwebtoken");

const getNews = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const [type, token] = authorization.split(" ");

      if (type !== "Bearer" || !token) {
        generateError("Invalid token format", 401);
      }

      req.auth = jwt.verify(token, process.env.JWT_SECRET);
    }

    const theme = req.query.theme;

    if (theme) {
      await themesSchema.validateAsync(theme);
    }

    const news = await selectNews(theme, req.auth?.id);

    res.status(200).send({ status: "ok", data: news });
  } catch (error) {
    next(error);
  }
};

module.exports = getNews;
