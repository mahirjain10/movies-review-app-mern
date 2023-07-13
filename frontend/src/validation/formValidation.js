import { object, string } from "yup";


let signUpSchema = object().shape({
    name:string().required('Name is required').min(3,"Name should be atleast 3 charachter long").max(20,"Name should be less than 20 charachters").matches(/^[a-zA-Z\s]+$/, "Name should only contain alphabets and spaces").required('Name is required'),
    email:string().required('Email is required').email('Invalid email'),
    password:string().required('Password is required').min(8,'Password should be atleast 8 charachter long').max(15,'password should not be more than 15 charachter long').required('Password is required'),
})
let signInSchema =object().shape({
    email:string().required('Email is required').email('Invalid email'),
    password:string().required('Password is required').min(8,'Password should be atleast 8 charachter long').max(15,'password should not be more than 15 charachter long').required('Password is required'),
})
let otpSchema = object().shape({
    otp:string().required('OTP is required').min(5,'Please enter 6 digit otp')
})
let forgetPasswordSchema=object().shape({
    email:string().required('Email is required').email('Invalid email')
})
export { signUpSchema ,signInSchema,otpSchema,forgetPasswordSchema};
