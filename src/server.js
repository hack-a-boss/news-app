require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const {
  registerUser,
  loginUser,
  editAvatar,
  getProfile,
} = require("./controllers/users");
const {
  getNews,
  getNewsItem,
  postNewsItem,
  editNewsItem,
  deleteNewsItem,
} = require("./controllers/news");
const { likeNewsItem, dislikeNewsItem } = require("./controllers/votes");

const { handleNotFound, handleError, validateAuth } = require("./middlewares");

const app = express();

const { SERVER_HOST, SERVER_PORT, UPLOADS_DIR } = process.env;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, UPLOADS_DIR)));

app.get("/profile", validateAuth, getProfile);
app.post("/register", registerUser);
app.post("/login", loginUser);
app.put("/user/avatar", validateAuth, editAvatar);

app.get("/news", getNews);
app.get("/news/:id", getNewsItem);
app.post("/news", validateAuth, postNewsItem);
app.patch("/news/:id", validateAuth, editNewsItem);
app.delete("/news/:id", validateAuth, deleteNewsItem);

app.post("/news/like/:id", validateAuth, likeNewsItem);
app.post("/news/dislike/:id", validateAuth, dislikeNewsItem);

app.use(handleNotFound);
app.use(handleError);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
