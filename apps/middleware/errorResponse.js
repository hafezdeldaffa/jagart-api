exports.errorResponse = (statusCode, message, res, err, req, next) => {
  const status = statusCode || 500;
  res.status(status).json({ error: { statusCode: status, message: message } });
};
