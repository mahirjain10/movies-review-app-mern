import client from "./client";

const submitOtpApi=(data)=> client.post('/user/verify-otp',data,{
    withCredentials: true,
 });

export default submitOtpApi

