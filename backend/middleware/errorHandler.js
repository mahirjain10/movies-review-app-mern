const { sendResponse } = require("../utils/sendResponse");

exports.errorHandler = (error, req, res, next) => {
  console.log(error);
  const errorStatus = error.statusCode || 500;
  const errorMsg = error.message || "Something went wrong";

  sendResponse(res, errorStatus, {
    message: errorMsg,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};
