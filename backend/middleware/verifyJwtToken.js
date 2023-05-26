const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/sendResponse");
exports.verifyJwtToken = async (req, res, next) => {
  try{
    console.log("showing cookies : ",req.cookies);
    console.log("showing cookies token : ",req.cookies.token);
    const getToken = req.cookies.token;
    if (!getToken)
      return sendResponse(res, 404, { message: "Token not found !" });
    const user = await jwt.verify(getToken, process.env.JWT_SECRET);
    if (!user) return sendResponse(res, 400, { message: "Authentication failed" });

    req.id = user.id;
    next();
  }
  catch(err){
    next(err);
  }
};
