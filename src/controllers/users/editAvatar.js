const { selectUserById, updateUser } = require("../../repositories/users");
const {
  generateError,
  processAndSaveImage,
  deleteImage,
} = require("../../utils");

const editAvatar = async (req, res, next) => {
  try {
    const loggedUserId = req.auth.id;

    const avatar = req.files?.avatar;

    if (!avatar) {
      generateError("A new avatar is required", 400);
    }

    const loggedUserInfo = await selectUserById(loggedUserId);

    if (loggedUserInfo.avatar) {
      await deleteImage(loggedUserInfo.avatar, "avatars");
    }

    loggedUserInfo.avatar = await processAndSaveImage(avatar.data, "avatars");

    await updateUser(loggedUserInfo);

    res.status(200).send({ status: "ok", data: loggedUserInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = editAvatar;
