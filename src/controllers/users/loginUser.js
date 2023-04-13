const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { selectUserByEmail } = require("../../repositories/users");
const { loginSchema } = require("../../schemas/users");
const { generateError } = require("../../utils");

const loginUser = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await selectUserByEmail(email);

    if (!user) {
      generateError("Wrong email or password", 403);
    }

    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (!isPasswordOk) {
      generateError("Wrong email or password", 403);
    }

    const tokenPayload = { id: user.id };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({ status: "ok", data: { token } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
