const getPool = require("../../database/getPool");

const insertUser = async (user) => {
  const { email, encryptedPassword, username, avatar } = user;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)",
    [username, email, encryptedPassword, avatar]
  );

  return insertId;
};

module.exports = insertUser;
