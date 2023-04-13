const getPool = require("../../database/getPool");

const VOTE_TYPES = { like: 1, dislike: 0 };

const insertVote = async ({ newsItemId, userId, type = "like" }) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO votes (newsItemId, userId, type) VALUES (?, ?, ?)",
    [newsItemId, userId, VOTE_TYPES[type]]
  );

  return insertId;
};

module.exports = insertVote;
