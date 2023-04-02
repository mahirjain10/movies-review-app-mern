exports.sendResponse=(res,statusCode,resObj)=>{
    console.log(statusCode);
    console.log(resObj);
    res.status(statusCode).json({statusCode:res.statusCode,...resObj});
}