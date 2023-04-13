const postNewsItemSchema = require("./postNewsItemSchema");

const editNewsItemSchema = postNewsItemSchema
  .fork(Object.keys(postNewsItemSchema.describe().keys), (field) =>
    field.optional()
  )
  .min(1)
  .messages({
    "object.min": "You need to include at least one field to edit",
  });

module.exports = editNewsItemSchema;
