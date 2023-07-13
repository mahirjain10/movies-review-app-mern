import client from "./client";

const verifyResetTokenApi=(data)=> client.post('/user/verify-pass-rest-token',data,{
});

export default verifyResetTokenApi