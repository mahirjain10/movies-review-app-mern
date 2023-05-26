import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Label from "../form/Label";
import Input from "../form/Input";
import Button from "../form/Button";
import FormNav from "../form/FormNav";
import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import ErrorLine from "../form/ErrorLine";
import useInputError from '../hooks/useInputError'
import ThemeContext from "../context/Theme";
import signUpApi from "../../apis/signUpApi";
import useAPI from "../hooks/useApi";
import { signUpSchema } from "../../validation/formValidation";
import ProtectedRouteContext from "../context/ProtectedRouteContext";
import AuthContext from "../context/AuthContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    name: null,
    email: null,
    password: null,
  });
  const {changeValue,isSignedUpRef,setValueInLS}= useContext(ProtectedRouteContext);
  const {isLoggedIn,setIsLoggedIn,changeValueOfIsLoggedIn,removeValueFromLS,setIsLoggedInValueInLS}=useContext(AuthContext)
  const {onInputChangeError,onSubmitError,errorRef}=useInputError(data,signUpSchema);
  const dataRef = useRef(data);

  const { error, setResponse,response,disabled, request } = useAPI(signUpApi);
  const onInputHandler = async (e) => {
    dataRef.current[e.target.name] = e.target.value;
    setData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      return updatedData;
    });
    
    onInputChangeError(e.target.name,dataRef.current)
  };
  
   
    const onFormSubmit = async (e) => {
      e.preventDefault();
      onSubmitError(dataRef.current,request)
    }
    useEffect(()=>{
      if(response===null){
        return;
      }
      if(response.data.statusCode===201){
        changeValue();
        setValueInLS();
        changeValueOfIsLoggedIn(true);
        setIsLoggedInValueInLS();
        setResponse(null);
        navigate('/auth/otp-verification');
      }
    },[response])
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
        <FormContainer
          className="h-[520px]auto w-[322px]"
          onSubmit={onFormSubmit}
          >
          <Title className="text-xl">Sign up</Title>
          <div className="flex flex-col mt-8">
            <Label>Name</Label>
            <Input
              placeholder="John Doe"
              type="text"
              className="p-2 w-[269px]"
              value={data.name || ""}
              name="name"
              onChange={onInputHandler}
              />
          </div>
          {/* {console.log(errorRef.current)} */}
          <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px]">{errorRef.current.name}</ErrorLine>
          <div
            className={`flex flex-col ${
              errorRef.current.name === null ? "mt-8" : ""
            } `}
          >
            <Label>Email</Label>
            <Input
              placeholder="johndoe@gmail.com"
              type="email"
              className="p-2 w-[269px]"
              value={data.email || ""}
              name="email"
              onChange={onInputHandler}
            />
          </div>
          {/* {console.log("errror : ", errorRef.current.email)} */}
          <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px]">{errorRef.current.email}</ErrorLine>
          <div
            className={`flex flex-col ${
              errorRef.current.email === null ? "mt-8" : ""
            } `}
          >
            <Label>Password</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              className="p-2 w-[269px]"
              value={data.password || ""}
              name="password"
              onChange={onInputHandler}
            />
          </div>
          <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px]">{errorRef.current.password}</ErrorLine>
          <Button
            className={`${
              errorRef.current.password===null ? "mt-8" : ""
            }`}
            type="submit"
            disabled={disabled}
          >
            Sign up
          </Button>
          <div className="flex flex-row justify-around w-full mt-8 mb-8">
            <FormNav to="/auth/forget-password">Forget Password</FormNav>
            <FormNav to="/auth/sign-in">Sign in</FormNav>
          </div>
        </FormContainer>
      </Container>
    </>
  );
};

export default SignUpForm;
