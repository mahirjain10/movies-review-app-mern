// import { createContext, useRef, useState } from "react";

// const InputErrorContext = createContext();
// const InputErrorProvider = ({ children }) => {
//   const [inputError, setInputError] = useState({
//     name: "",
//     email: "",
//     password: "",
//     ok: false,
//   });
//   const [data, setData] = useState({
//       name: "",
//       email: "",
//       password: "",
//     });

//   const specialCharRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//   const numberRegex = /[0-9]/;
//   const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//   //     if(!name.trim()) return {ok:false,error:"name is missing",inputField:"name"}
//     if(specialCharRegex.test(data.name)) {
//         console.log({ok:false, error:"name contains special charachter"})
//         // setInputError(prevData=>{{...prevData,name:"name contains special charachter"}})
//         setInputError(prevData=>{
//             const newData = { ...prevData, name: "name contains special charachter",ok:false};
//     //   console.log("data:", newData); // logs the most recent value of data
//             return newData;
//         })
        
//     }
//     // return {ok:false, error:"name contains special charachter"}
//   //   if(numberRegex.test(name)) return {ok:false, error:"name contains number"}
//   //   if(!email.trim()) return{ok:false,error:"email is missing",inputField:"email"}
//   //   if(!emailRegex.test(email)) return{ok:false,error:"email is invalid"}
//   //   if(!password.trim()) return {ok:false,error:"password is missing"}
//   //   console.log(password.length)
//   //   if(password.length<8 || password.length>15) return {ok:false,error:"password should be 8 charachter long"}
//   //   if (name.length < 3 || name.length > 20) return {ok:false,error:"name length should be 3 to 20 charachters"}

//   //   return {ok:true}
//   return (
//     <InputErrorContext.Provider
//       value={{ data, setData, inputError, setInputError }}
//     >
//       {children}
//     </InputErrorContext.Provider>
//   );
// };

// export { InputErrorProvider };
// export default InputErrorContext;

// // import { useState } from "react";
// // const ValidateForm = ({
// //   name,
// //   email,
// //   password,
// // }) => {
// //   console.log(name);
// //   // const nameLengthRegex=/{3,20}/
// //   const specialCharRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
// //   const numberRegex = /[0-9]/;
// //   const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
// //   if(!name.trim()) return {ok:false,error:"name is missing",inputField:"name"}
// //   if(specialCharRegex.test(name)) return {ok:false, error:"name contains special charachter"}
// //   if(numberRegex.test(name)) return {ok:false, error:"name contains number"}
// //   if(!email.trim()) return{ok:false,error:"email is missing",inputField:"email"}
// //   if(!emailRegex.test(email)) return{ok:false,error:"email is invalid"}
// //   if(!password.trim()) return {ok:false,error:"password is missing"}
// //   console.log(password.length)
// //   if(password.length<8 || password.length>15) return {ok:false,error:"password should be 8 charachter long"}
// //   if (name.length < 3 || name.length > 20) return {ok:false,error:"name length should be 3 to 20 charachters"}
// //     return {ok:true}
// // }

// // export default ValidateForm;
