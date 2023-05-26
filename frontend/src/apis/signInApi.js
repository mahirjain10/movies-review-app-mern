import client from "./client";

const signIpApi=(data)=> client.post('/user/sign-in',data);

export default signIpApi