import Input from "../form/Input";
import Label from "../form/Label";
import Button from "../form/Button";
import Title from "../form/Title";
import Container from "../users/Container";
import FormContainer from "../form/FormContainer";
import FormNav from "../form/FormNav";
import { useState, useRef,useContext,useEffect } from "react";
import useInputError from "../hooks/useInputError";
import ErrorLine from "../form/ErrorLine";
import useAPI from "../hooks/useApi";
import { ToastContainer } from "react-toastify";
import ThemeContext from "../context/Theme";
import ProtectedRouteContext from "../context/ProtectedRouteContext";
import signIpApi from "../../apis/signInApi";
import { signInSchema } from "../../validation/formValidation";
import AuthContext from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import resendOtpApi from "../../apis/resendOtpApi";

const SignInForm = () => {
  const [data, setData] = useState({
    email: null,
    password: null,
  });
  const { theme } = useContext(ThemeContext);
  const {changeValue,isSignedUpRef,setValueInLS}= useContext(ProtectedRouteContext);
  const {isLoggedIn,setIsLoggedIn,changeValueOfIsLoggedIn,removeValueFromLS,setIsLoggedInValueInLS}=useContext(AuthContext)
  const { onInputChangeError, onSubmitError, errorRef } = useInputError(data,signInSchema);
  const dataRef = useRef(data);
  const { error: signInError, response: signInResponse, setResponse: setSignInResponse, disabled: signInDisabled, request: signInRequest } = useAPI(signIpApi);
  const { error: resendOtpError, response: resendOtpResponse, setResponse: setResendOtpResponse,request:resendOtpRequest } = useAPI(resendOtpApi);

  const navigate = useNavigate();

  const onInputHandler = async(e) => {
    dataRef.current[e.target.name] = e.target.value;
    setData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      return updatedData;
    });
    onInputChangeError(e.target.name,dataRef.current)
    console.log(dataRef.current);
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    onSubmitError(dataRef.current,signInRequest)
    console.log("disavked btn :",signInDisabled)
  }
  useEffect(()=>{
    if(signInResponse===null){
      return;
    }
    if(signInResponse.data.statusCode===200){
      changeValue();
      setValueInLS();
      changeValueOfIsLoggedIn(true);
      setIsLoggedInValueInLS();
      setSignInResponse(null);
      console.log("is verified : ",signInResponse.data.user.isVerified)
      if(signInResponse.data.user.isVerified===false){
        resendOtpRequest(false,{owner:signInResponse.data.user.id});
        navigate('/auth/otp-verification');
      }
      else{
        navigate('/welcome-page');
      }
    }
  },[signInResponse])

  console.log(errorRef)
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme={theme}
      />
    <Container>
      <FormContainer className="h-[445px]auto w-[322px]"  onSubmit={onFormSubmit}>
        <Title className="text-xl">Sign in</Title>
        <div className="flex flex-col mt-8">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="johndoe@gmail.com"
            className="p-2 h-11 w-[269px]"
            value={data.email || ""}
            onChange={onInputHandler}
            name="email"
          />
        </div>
        <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px]">{errorRef.current.email}</ErrorLine>
        <div
          className={`flex flex-col ${
            errorRef.current.email === null ? "mt-10" : ""
          } `}
        >
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="*******"
            className="p-2 h-11 w-[269px]"
            value={data.password || ""}
            onChange={onInputHandler}
            name="password"
          />
        </div>
        <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px]">{errorRef.current.password}</ErrorLine>
        <Button
          className={`${errorRef.current.password === null ? "mt-10" : ""}`}
          type="submit"
          disabled={signInDisabled}
        >
          Sign In
        </Button>
        <div className="flex flex-row justify-around w-full mt-10 mb-10">
          <FormNav to="/auth/forget-password">Forgot Password</FormNav>
          <FormNav to="/auth/sign-up">Sign up</FormNav>
        </div>
      </FormContainer>
    </Container>
    </>
  );
};

export default SignInForm;
