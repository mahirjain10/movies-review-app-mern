const {sendResponse} = require('../utils/sendResponse')

exports.isAdmin=(req,res,next)=>{
    const {user}=req;
    console.log(user)
    if(!user.role==='admin'){
        return sendResponse(res,401,{message:"Unauthorized access , you are not an admin"})
    }
    next()
}
