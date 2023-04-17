const { selectUserById } = require("../../repositories/users");

const getProfile = async (req, res, next) => {
  try {
    const user = await selectUserById(req.auth.id);

    res.status(200).send({ status: "ok", data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = getProfile;
