import SignInForm from "./components/auth/SignInForm"
import Navbar from "./components/users/Navbar"
import { Route, Routes } from "react-router-dom"
import SignUpForm from "./components/auth/SignUpForm"
import ForgetPasswordForm from "./components/auth/ForgetPasswordForm"
import ResetPasswordForm from "./components/auth/ResetPasswordForm"
import OtpVerificationForm from "./components/auth/OtpVerificationForm"
import ProtectedRoute from "./components/users/ProtectedRoute"
import { useContext } from "react"
import WelcomePage from './WelcomePage'
import ProtectedRouteContext from "./components/context/ProtectedRouteContext"
const App =()=>{
    const{getValueFromLS}=useContext(ProtectedRouteContext)
    return (
        <>
        <Navbar/>

        <Routes>
        <Route path="/auth/sign-in" element={<SignInForm/>}/> 
        <Route path="/auth/sign-up" element={<SignUpForm/>}/> 
        <Route path="/auth/forget-password" element={<ForgetPasswordForm/>}/>
        <Route path="/auth/reset-password" element={<ResetPasswordForm/>}/>
        {console.log(getValueFromLS())};
        <Route path="/auth/otp-verification" element={<ProtectedRoute isAuthenticated={getValueFromLS()}><OtpVerificationForm/></ProtectedRoute>}/>
        <Route path="/welcome-page" element={<WelcomePage/>}/>
        <Route path="*" element={<div>not found</div>}/>
        </Routes> 
        </>
    )
}

export default App