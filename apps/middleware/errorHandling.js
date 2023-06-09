exports.errorHandling = (err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  };