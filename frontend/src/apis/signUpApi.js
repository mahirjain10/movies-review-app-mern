 import client from "./client";

 const signUpApi=(data)=> client.post('/user/sign-up',data,{
    withCredentials: true,
 });

 export default signUpApi