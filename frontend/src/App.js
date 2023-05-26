import SignInForm from "./components/auth/SignInForm"
import Navbar from "./components/users/Navbar"
import { Route, Routes } from "react-router-dom"
import SignUpForm from "./components/auth/SignUpForm"
import ForgetPasswordForm from "./components/auth/ForgetPasswordForm"
import ConfirmPasswordForm from "./components/auth/ConfirmPasswordForm"
import OtpVerificationForm from "./components/auth/OtpVerificationForm"
import ProtectedRoute from "./components/users/ProtectedRoute"
import { useContext } from "react"
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
        <Route path="/auth/confirm-password" element={<ConfirmPasswordForm/>}/>
        {console.log(getValueFromLS())};
        <Route path="/auth/otp-verification" element={<ProtectedRoute isAuthenticated={getValueFromLS()}><OtpVerificationForm/></ProtectedRoute>}/>
        <Route path="*" element={<div>not found</div>}/>
        </Routes> 
        </>
    )
}

export default App