CREATE DATABASE IF NOT EXISTS news_app;

USE news_app;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(100),
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE votes (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId INT UNSIGNED NOT NULL,
    newsItemId INT UNSIGNED NOT NULL,
    type BOOLEAN NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (newsItemId) REFERENCES news(id) ON DELETE CASCADE
);