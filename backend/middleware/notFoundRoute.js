const { sendResponse } = require("../utils/sendResponse")

exports.notFoundRoute=(req,res,next)=>{
    sendResponse(res,404,{message:"route not found"});
    next()
}