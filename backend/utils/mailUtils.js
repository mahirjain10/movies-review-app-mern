const nodemailer =require('nodemailer');
const { sendResponse } = require('./sendResponse');
exports.mailTransporter=()=>{
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PWD,
        },
      });
      return transport
}
exports.createMailAndSend=async(transport,mailFrom,mailTo,subject,message)=>{
    try{
      const res=await transport.sendMail({
        from: mailFrom,
        to: mailTo,
        subject,
        html:message
      })
      // console.log(res)
      // return console.log("i am running")
      return {
        ok:true
      }
    }
    catch(error){
      console.log(error)
      return {
        ok:false,
        error
      }
    }
  }