const getPool = require("../../database/getPool");

const selectNewsItemById = async (id, loggedUserId) => {
  const pool = getPool();

  const [[newsItem]] = await pool.query(
    "SELECT n.*, u.username, CAST(IFNULL(SUM(v.type = 1), 0) AS UNSIGNED) likes, CAST(IFNULL(SUM(v.type = 0), 0) AS UNSIGNED) dislikes, IF(SUM(selfV.type = 1), TRUE, FALSE) likedByLoggedUser, IF(SUM(selfV.type = 0), TRUE, FALSE) dislikedByLoggedUser FROM news n INNER JOIN users u ON n.ownerId = u.id LEFT JOIN votes v ON n.id = v.newsItemId LEFT JOIN votes selfV ON (n.id = selfV.newsItemId AND selfV.userId = ?) WHERE n.id = ?",
    [loggedUserId, id]
  );

  if (!newsItem.id) {
    return;
  }

  return newsItem;
};

module.exports = selectNewsItemById;
