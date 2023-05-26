const { sendResponse } = require("../utils/sendResponse");
const jwt=require('jsonwebtoken')
const {clearCookie,setCookie}= require('../utils/cookies');
exports.refreshJwtToken=async(req,res,next)=>{
    try{
      console.log("from refresh token fun, token = ",req.cookies.token);
        const prevToken=req.cookies.token;
        console.log(prevToken)
        if(!prevToken) sendResponse(res,404,{message:"Token not found"});
        const user=await jwt.verify(prevToken,process.env.JWT_SECRET);
        if(!user) return sendResponse(res,400,{message: "Authentication failed"});
        clearCookie(res);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "17m",
          });
          console.log("Regenerated Token\n", token);
      
        setCookie(res,token);
          req.id = user.id;
          next();
        
    }
    catch(err){
        next(err);
    }
}