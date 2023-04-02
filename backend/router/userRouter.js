const express = require('express');
const { signUp ,verifyOtp, resendOtp,forgetPassword,resetPassword, signIn} = require('../controller/userController');
const { checkToken } = require('../middleware/checkToken');
const {validator,validatorResult,passwordValidator, signInValidator} = require('../middleware/validator')
const router = express.Router();

router.post('/sign-up',validator,validatorResult,signUp);
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp',resendOtp)
router.post('/forget-password',forgetPassword)
router.post('/verify-pass-rest-token',checkToken,(req,res)=>{
    res.json({valid:"true"})
})
router.post('/reset-password',passwordValidator,validatorResult,checkToken,resetPassword);
router.post('/sign-in',signInValidator,validatorResult,signIn);
module.exports=router