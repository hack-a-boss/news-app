const getPool = require("../../database/getPool");

const updateNewsItem = async (newsItem) => {
  const { id, title, content, theme, photo } = newsItem;

  const pool = getPool();

  await pool.query(
    "UPDATE news SET title = ?, content = ?, theme = ?, photo = ? WHERE id = ?",
    [title, content, theme, photo, id]
  );
};

module.exports = updateNewsItem;
