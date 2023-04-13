const getPool = require("../../database/getPool");

const VOTE_TYPES = { like: 1, dislike: 0 };

const selectVote = async ({ newsItemId, userId, type = "like" }) => {
  const pool = getPool();

  const [[vote]] = await pool.query(
    "SELECT * FROM votes WHERE newsItemId = ? AND userId = ? AND type = ?",
    [newsItemId, userId, VOTE_TYPES[type]]
  );

  return vote;
};

module.exports = selectVote;
