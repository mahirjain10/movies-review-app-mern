const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mailTransporter, createMailAndSend } = require("../utils/mailUtils");
const { userModel } = require("../models/user");
const { otpModel } = require("../models/otp");
const { pwdResetModel } = require("../models/resetPassword");
const { generateOtp, generateRandomByte } = require("../utils/helper");
const { isValidObjectId } = require("mongoose");
const { sendResponse } = require("../utils/sendResponse");

exports.signUp = async (req, res, next) => {
  const user = new userModel(req.body);
  const findUser = await userModel.findOne({ email: req.body.email });
  if (findUser) {
    console.log("email already exist");
    return sendResponse(res, 409, {
      message: "email already exists",
    });
  }
  try {
    const userSaved=await user.save();
    console.log(userSaved);
    const otpValue = generateOtp();
    const otp = new otpModel({
      owner: user._id,
      otp: otpValue,
    });
    const transport = mailTransporter();
    const { ok, error } = await createMailAndSend(
      transport,
      "moviesreviewapp@gmail.com",
      user.email,
      "otp sent to you",
      `<p>Your otp is ${otpValue}`
    );
    if (!ok) {
      return sendResponse(res, 400, { message: "error while sending message" });
    }
    const otpSuccess=await otp.save();
    console.log(otpSuccess)
    console.log("success");
    sendResponse(res, 201, {
      message: "account created successfully",
      user:userSaved
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { owner, otp } = req.body;
    if (!isValidObjectId(owner)) {
      return sendResponse(res, 400, {
        message: "invalid object id",
        statusCode: res.statusCode,
      });
    }
    const user = await userModel.findById(owner);
    if (!user) {
      return sendResponse(res, 404, {
        message: "user not found",
        statusCode: res.statusCode,
      });
    }
    if (user.isVerified) {
      return sendResponse(res, 401, {
        message: "user already verified",
        statusCode: res.statusCode,
      });
    }
    const otpData = await otpModel.findOne({ owner });
    if (!otpData) {
      return sendResponse(res, 404, {
        message: "otp not sent yet",
        statusCode: res.statusCode,
      });
    }
    console.log(otpData.otp);
    const result = await bcrypt.compare(otp, otpData.otp);
    if (!result) {
      return sendResponse(res, 401, {
        message: "otp mismatch",
        statusCode: res.statusCode,
      });
    }
    await otpModel.findByIdAndDelete(otpData.owner);
    user.isVerified = true;
    await user.save();
    var transport = mailTransporter();
    const { ok, error } = await createMailAndSend(
      transport,
      "moviesreviewapp@gmail.com",
      user.email,
      "welcome to movies review app",
      `<p>welcome to review app</p>`
    );
    if (!ok) {
      console.log(error);
      user.isVerified = false;
      await user.save();
      return sendResponse(res, 400, { message: "error while sending message" });
    }
    return sendResponse(res, 200, {
      message: "otp matched",
      statusCode: res.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const { owner } = req.body;
    if (!isValidObjectId(owner)) {
      return sendResponse(res, 400, {
        message: "invalid objectId",
        statusCode: res.statusCode,
      });
    }
    const user = await userModel.findById(owner);
    if (!user) {
      return sendResponse(res, 404, {
        message: "user not found",
        statusCode: res.statusCode,
      });
    }
    if (user.isVerified) {
      return sendResponse(res, 401, {
        message: "user already verified",
        statusCode: res.statusCode,
      });
    }
    const otpData = await otpModel.findOne({ owner });
    // console.log(otpData.owner);
    if (otpData) {
      const data = await otpModel.findOneAndDelete({ owner: otpData.owner });
      console.log(data);
    }
    const otpValue = generateOtp();
    const otp = new otpModel({
      owner: user._id,
      otp: otpValue,
    });
    otp.save();
    var transport = mailTransporter();
    const { ok, error } = await createMailAndSend(
      transport,
      "moviesreviewapp@gmail.com",
      user.email,
      "otp resent to you",
      `<p>otp resent to you ${otpValue}</p>`
    );
    // console.log(response)
    if (!ok) {
      return sendResponse(res, 400, { message: "error while sending message" });
    }
    console.log("otp value after resend ", otpValue);
    return sendResponse(res, 200, {
      message: "otp resent",
      statusCode: res.statusCode,
    });
  } catch (error) {
    next(error);
  }
};
exports.forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return sendResponse(res, 401, {
        message: "email is missing",
        statusCode: res.statusCode,
      });
    }
    const user = await userModel.findOne({ email });
    console.log("user : ", user);
    if (!user) {
      return sendResponse(res, 404, {
        message: "user not found",
        statusCode: res.statusCode,
      });
    }
    const stringObjId = user._id.toString();
    console.log(typeof stringObjId);
    console.log(user._id);
    const resetPwdData = await pwdResetModel.findOne({ owner: user._id });
    console.log("reset pwd data : ", resetPwdData);
    if (resetPwdData) {
      console.log(typeof user._id);
      const deletedData = await pwdResetModel.findByIdAndRemove(
        resetPwdData._id
      );
      console.log("deleted data : ", deletedData);
    }
    const token = await generateRandomByte();
    console.log("token : ", token);
    console.log("user id : ", user._id);
    const pwdResetToken = await pwdResetModel({ owner: user._id, token });
    pwdResetToken.save();
    const resetPasswordLink = `http:localhost:3000/reset-password?token=${token}?id=${user._id}`;
    var transport = mailTransporter();
    const { ok, error } = await createMailAndSend(
      transport,
      "moviesreviewapp@gmail.com",
      user.email,
      "reset link",
      `<p>Click on this link  to change password</p>
        <a href=${resetPasswordLink}>Change Password</a>`
    );
    if (!ok) {
      return sendResponse(res, 400, { message: "error while sending message" });
    }
    sendResponse(res, 200, {
      message: "reset link sent to your email",
      statusCode: res.statusCode,
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { owner, token, newPassword } = req.body;
    if (!isValidObjectId(owner))
      return sendResponse(res, 400, {
        message: "invalid objectId",
        statusCode: res.statusCode,
      });
    const userData = await userModel.findById(owner);
    const matchedToken = await bcrypt.compare(newPassword, userData.password);
    console.log(matchedToken);
    if (matchedToken)
      return sendResponse(res, 400, {
        message: "New password  cannot be as same as old password",
      });
    userData.password = newPassword;
    userData.save();
    var transport = mailTransporter();
    const { ok, error } = await createMailAndSend(
      transport,
      "moviesreviewapp@gmail.com",
      userData.email,
      "password reset successfull",
      `<p>password resetted successfully</p>`
    );
    if (!ok) {
      return sendResponse(res, 400, { message: "error while sending message" });
    }
    const deletedPwdResetToken = await pwdResetModel.findOneAndDelete({
      owner,
    });
    sendResponse(res, 200, { message: "password reset succesfully" });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return sendResponse(res, 404, { message: "user not found" });
    const matched = await bcrypt.compare(password, user.password);
    if (!matched)
      return sendResponse(res, 401, { message: "ircorrect password" });
    const jwtToken = jwt.sign({ userId: user._id });
    sendResponse(res, 200, {
      user: { name: user.name, email: user.email, token: jwtToken },
      message: "user signed in successfully",
    });
  } catch (error) {
    next(error);
  }
};
