const getPool = require("../../database/getPool");

const selectNews = async (theme, loggedUserId) => {
  const pool = getPool();

  let query =
    "SELECT n.*, u.username, CAST(IFNULL(SUM(v.type = 1), 0) AS UNSIGNED) likes, CAST(IFNULL(SUM(v.type = 0), 0) AS UNSIGNED) dislikes, IF(SUM(selfV.type = 1), TRUE, FALSE) likedByLoggedUser, IF(SUM(selfV.type = 0), TRUE, FALSE) dislikedByLoggedUser FROM news n INNER JOIN users u ON n.ownerId = u.id LEFT JOIN votes v ON n.id = v.newsItemId LEFT JOIN votes selfV ON (n.id = selfV.newsItemId AND selfV.userId = ?)";
  let queryValues = [loggedUserId];

  if (theme) {
    query += " WHERE theme LIKE ?";
    queryValues.push(theme);
  }

  query += " GROUP BY n.id";

  const [news] = await pool.query(query, queryValues);

  return news;
};

module.exports = selectNews;
