const Joi = require("joi");

const newsItemIdSchema = Joi.number().positive().required();

module.exports = newsItemIdSchema;
