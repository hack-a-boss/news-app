const getPool = require("../../database/getPool");

const removeNewsItem = async (id) => {
  const pool = getPool();

  await pool.query("DELETE FROM news WHERE id = ?", [id]);
};

module.exports = removeNewsItem;
