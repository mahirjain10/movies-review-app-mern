import client from "./client";

const forgetPasswordApi=(data)=> client.post('/user/forget-password',data,{
    withCredentials:true
});

export default forgetPasswordApi