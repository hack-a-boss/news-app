const handleError = (error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    error.statusCode = 400;
  }

  res
    .status(error.statusCode || 500)
    .send({ status: "error", message: error.message });
};

module.exports = handleError;
