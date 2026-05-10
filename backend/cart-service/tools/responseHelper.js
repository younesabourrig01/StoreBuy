exports.sendSuccess = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    results: Array.isArray(data) ? data.length : undefined,
    data: data,
  });
};

exports.sendError = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    status: "error",
    message: message,
  });
};

exports.sendNotFound = (res, info, statusCode = 404) => {
  return res.status(statusCode).json({
    status: "fail",
    message: `${info} not found!`,
  });
};
