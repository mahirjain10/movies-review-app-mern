import { useState } from "react";
const validateForm = (
  name,
  email,
  password,
  inputHolder
) => {
  console.log(name);
  // const nameLengthRegex=/{3,20}/
  const specialCharRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const numberRegex = /[0-9]/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if(inputHolder==="name"){
    if(!name.trim()) return {ok:false,error:"name is missing",inputField:"name"}
    if(specialCharRegex.test(name)) return {ok:false, error:"name contains special charachter"}
    if(numberRegex.test(name) ) return {ok:false, error:"name contains number"}
    if (name.length < 3 || name.length > 20) return {ok:false,error:"name length should be 3 to 20 charachters"}
  }
  if(inputHolder==="email"){
    if(!email.trim()) return{ok:false,error:"email is missing",inputField:"email"}
    if(!emailRegex.test(email)) return{ok:false,error:"email is invalid"}
  }
  if(inputHolder==="password"){
    if(!password.trim()) return {ok:false,error:"password is missing"}
    console.log(password.length)
    if(password.length<8 || password.length>15) return {ok:false,error:"password should be 8 charachter long"}
    console.log('reached here')
  }
  return {ok:true,error:null}
}

export default validateForm;
