const Joi = require("joi");
const themesSchema = require("./themesSchema");

const postNewsItemSchema = Joi.object({
  title: Joi.string().min(4).max(300).required().messages({
    "string.min": "Title has to be 4 characters long",
    "string.max": "Title has to be less than 300 characters long",
    "any.required": "Title is required",
    "string.base": "Title has to be a string",
  }),
  content: Joi.string().min(4).max(10000).required().messages({
    "string.min": "Content has to be 4 characters long",
    "string.max": "Content has to be less than 10000 characters long",
    "any.required": "Content is required",
    "string.base": "Content has to be a string",
  }),
  theme: themesSchema,
});

module.exports = postNewsItemSchema;
