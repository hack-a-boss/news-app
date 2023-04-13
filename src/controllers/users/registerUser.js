const bcrypt = require("bcrypt");
const path = require("path");
const { selectUserByEmail, insertUser } = require("../../repositories/users");
const { registerSchema } = require("../../schemas/users");
const { generateError, processAndSaveImage } = require("../../utils");

const registerUser = async (req, res, next) => {
  try {
    await registerSchema.validateAsync(req.body);

    const { username, email, password } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);

    if (userWithSameEmail) {
      generateError("Already exists an user with that email", 409);
    }

    let avatar = req.files?.avatar ?? null;
    let avatarName =
      avatar && (await processAndSaveImage(avatar.data, "avatars"));

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertedUserId = await insertUser({
      username,
      email,
      encryptedPassword,
      avatar: avatarName,
    });

    res.status(201).send({
      status: "ok",
      data: { id: insertedUserId, username, email, avatar: avatarName },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
