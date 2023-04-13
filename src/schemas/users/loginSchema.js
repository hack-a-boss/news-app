const Joi = require("joi");

const loginUserSchema = Joi.object({
  email: Joi.string().email().min(4).max(100).required().messages({
    "string.min": "Email has to be 4 characters long",
    "string.max": "Email has to be less than 100 characters long",
    "string.email": "Email has to be a valid email",
    "any.required": "Email is required",
    "string.base": "Email has to be a string",
  }),
  password: Joi.string().min(4).max(100).required().messages({
    "string.min": "Password has to be 4 characters long",
    "string.max": "Password has to be less than 100 characters long",
    "any.required": "Password is required",
    "string.base": "Password has to be a string",
  }),
});

module.exports = loginUserSchema;
