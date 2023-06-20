exports.errorResponse = (err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    data: err.data,
  });
};
