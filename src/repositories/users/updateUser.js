const getPool = require("../../database/getPool");

const updateUser = async (user) => {
  const { id, username, email, avatar } = user;

  const pool = getPool();

  await pool.query(
    "UPDATE users SET username = ?, email = ?, avatar = ? WHERE id = ?",
    [username, email, avatar, id]
  );
};

module.exports = updateUser;
