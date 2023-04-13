const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(4).max(50).required().messages({
    "string.min": "Username has to be 4 characters long",
    "string.max": "Username has to be less than 100 characters long",
    "any.required": "Username is required",
    "string.base": "Username has to be a string",
  }),
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

module.exports = registerSchema;
