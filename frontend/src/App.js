import SignInForm from "./components/auth/SignInForm"
import Navbar from "./components/users/Navbar"
import { Route, Routes } from "react-router-dom"
import SignUpForm from "./components/auth/SignUpForm"
import ForgetPasswordForm from "./components/auth/ForgetPasswordForm"
import ConfirmPasswordForm from "./components/auth/ConfirmPasswordForm"
import OtpVerificationForm from "./components/auth/OtpVerificationForm"

const App =()=>{
    return (
        <>
        <Navbar/>
        <Routes>
        <Route path="/auth/sign-in" element={<SignInForm/>}/> 
        <Route path="/auth/sign-up" element={<SignUpForm/>}/> 
        <Route path="/auth/forget-password" element={<ForgetPasswordForm/>}/>
        <Route path="/auth/confirm-password" element={<ConfirmPasswordForm/>}/>
        <Route path="/auth/email-verification" element={<OtpVerificationForm/>}/>
        <Route path="*" element={<div>not found</div>}/>
        </Routes> 
        </>
    )
}

export default App