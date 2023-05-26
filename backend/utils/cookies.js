exports.clearCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge:0
  });
};

exports.setCookie = (res,token) => {
  res.cookie("token", token, {









































  });
  console.log("token : ",token);
  
};
