import client from "./client";

const resendOtpApi=(data)=> client.post('/user/resend-otp',data,{
    withCredentials:true
});

export default resendOtpApi