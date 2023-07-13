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
const { clearCookie, setCookie } = require("../utils/cookies");

exports.signUp = async (req, res, next) => {
  const user = new userModel(req.body);
  try {
    const findUser = await userModel.findOne({ email: req.body.email });
    if (findUser) {
      console.log("email already exists");
      return sendResponse(res, 409, {
        message: "Email already exists",
      });
    }
    const userSaved = await user.save();
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
      "OTP sent to you",
      `<p>Your OTP is ${otpValue}`
    );
    if (!ok) {
      console.error(`Error sending email: ${error}`);
      await otp.remove(); // Remove the OTP if the email cannot be sent
      await user.remove(); // Remove the user if the email cannot be sent
      return sendResponse(res, 500, { message: "Error sending OTP email" });
    }
    const otpSuccess = await otp.save();
    console.log(otpSuccess);
    console.log("Success");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "17m",
    });
    console.log("console logging token from controller : ",token)
    setCookie(res,token)
    return sendResponse(res, 201, {
      message: "Account created successfully",
      user: userSaved,
    });
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    await user.remove(); // Remove the user if there is an error
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const owner=req.user.id
    const { otp } = req.body;
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
    const otpData = await otpModel.findOne({ owner});
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
    // clearCookie(res);
    return sendResponse(res, 200, {
      message: "otp matched",
      statusCode: res.statusCode,
      user: { name: user.name, email: user.email },
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
    // const stringObjId = user._id.toString();
    // console.log(typeof stringObjId);
    // console.log(user._id);
    const resetPwdData = await pwdResetModel.findOne({ owner: user._id });
    // console.log("reset pwd data : ", resetPwdData);
    if (resetPwdData) {
      // console.log(typeof user._id);
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
    const resetPasswordLink = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "17m",
    });

    console.log("console logging token from controller : ",token)
    setCookie(res,token);
    console.log(req.cookies);
    return sendResponse(res, 200, {
      user: { name: user.name, email: user.email,isVerified:user.isVerified,id:user._id },
      message: "user signed in successfully",
    });
 
  } catch (error) {
    next(error);
  }
};
// 
exports.logout = (req, res, next) => {
  const prevToken = req.cookies.token;
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  const user = jwt.verify(prevToken,process.env.JWT_SECRET)
      if (user) {
        return sendResponse(res, 400, { message: "Authentication failed" });
      }

      // res.clearCookie("token");
      clearCookie(res);
      // req.cookies[`${user.id}`] =z "";
      return res.status(200).json({ message: "Successfully Logged Out" });
};


exports.getUser = async (req, res, next) => {
  const userId = req.user.id;
  try{
    if(!isValidObjectId(userId)){
      return sendResponse(res,400,{message:"Invalid object id"})
    }
    const getUser= await userModel.findById(userId,"-password");
    if(!getUser){
      return sendResponse(res,404,{message:"User not found"});
    }
    return sendResponse(res,200,{message:"User found",user:getUser})
  }
  catch(error){
    next(error);
  }
};