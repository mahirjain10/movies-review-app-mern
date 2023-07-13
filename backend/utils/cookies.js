exports.clearCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge:0
  });
};

exports.setCookie = (res,token) => {
  try{
    console.log("showing token in cookie function : ",token)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,                                                                                                                                                                                                                                                                                                                                                                                                                                            
      sameSite: "strict",
      maxAge:1000*60*15
    });
  }
  catch(error){ 
    next(error)
  }
};
