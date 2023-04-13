const Joi = require("joi");

const validThemes = [
  "sports",
  "politics",
  "economy",
  "education",
  "society",
  "technology",
  "culture",
  "science",
  "gaming",
  "medicine",
];

const themesSchema = Joi.string()
  .valid(...validThemes)
  .required()
  .messages({
    "any.only": `Theme has to be one of these: ${validThemes.join(", ")}`,
    "any.required": "Theme is required",
    "string.base": "Theme has to be a string",
  });

module.exports = themesSchema;
