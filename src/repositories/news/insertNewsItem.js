const getPool = require("../../database/getPool");

const insertNewsItem = async (newsItem) => {
  const { title, content, theme, photo, ownerId } = newsItem;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO news (title, content, theme, photo, ownerId) VALUES (?, ?, ?, ?, ?)",
    [title, content, theme, photo, ownerId]
  );

  return insertId;
};

module.exports = insertNewsItem;
