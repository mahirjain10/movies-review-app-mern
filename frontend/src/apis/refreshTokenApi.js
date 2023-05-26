import client from "./client";

const refreshTokenApi=()=> client.get('/user/refresh-token',{
    withCredentials:true
});

export default refreshTokenApi