require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;
const getPool = require("./getPool");

const initDb = async () => {
  try {
    const pool = getPool();

    console.log("Deleting tables...");

    await pool.query("DROP TABLE IF EXISTS votes;");
    await pool.query("DROP TABLE IF EXISTS news;");
    await pool.query("DROP TABLE IF EXISTS users;");

    console.log("Deleting photos...");

    const uploadsPath = path.join(__dirname, "..", process.env.UPLOADS_DIR);

    try {
      await fs.rm(uploadsPath, { recursive: true });
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw new Error("Error trying to delete uploads directory");
      }

      await fs.mkdir(uploadsPath, { recursive: true });
    }

    console.log("Creating users table...");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            avatar VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log("Creating news table...");

    await pool.query(`
        CREATE TABLE IF NOT EXISTS news (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(300) NOT NULL,
            content VARCHAR(10000) NOT NULL,
            theme ENUM("sports", "politics", "economy", "education", "society", "technology", "culture", "science", "gaming", "medicine") NOT NULL,
            photo VARCHAR(100),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ownerId INT UNSIGNED NOT NULL,
            FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    console.log("Creating votes table...");

    await pool.query(`
        CREATE TABLE votes (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userId INT UNSIGNED NOT NULL,
            newsItemId INT UNSIGNED NOT NULL,
            type BOOLEAN NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (newsItemId) REFERENCES news(id) ON DELETE CASCADE
        );
    `);

    console.log("¡All done! 🚀");
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

initDb();
