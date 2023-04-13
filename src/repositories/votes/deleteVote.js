const getPool = require("../../database/getPool");

const VOTE_TYPES = { like: 1, dislike: 0 };

const deleteVote = async ({ newsItemId, userId, type = "like" }) => {
  const pool = getPool();

  await pool.query(
    "DELETE FROM votes WHERE newsItemId = ? AND userId = ? AND type = ?",
    [newsItemId, userId, VOTE_TYPES[type]]
  );
};

module.exports = deleteVote;
