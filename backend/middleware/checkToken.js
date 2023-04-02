const { isValidObjectId } = require("mongoose");
const { pwdResetModel } = require("../models/resetPassword");
const { sendResponse } = require("../utils/sendResponse");
const bcrypt = require("bcryptjs");

exports.checkToken = async (req, res, next) => {
  try {
    const { token, owner } = req.body;
    if (!token.trim() || !isValidObjectId(owner)) {
      return sendResponse(res, 400, { message: "Invalid Request" });
    }
    const userData = await pwdResetModel.findOne({ owner });
    if (!userData) {
      return sendResponse(res, 404, {
        message: "Token for user not available ,request reset token",
      });
    }
    const matchedToken = await bcrypt.compare(token, userData.token);
    console.log(matchedToken);
    if (!matchedToken) {
      return sendResponse(res, 401, { message: "Unauthorized access" });
    }
    req.resetToken = token;
    next();
  } catch (error) {
    next(error);
  }
};
