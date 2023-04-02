import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Input from "../form/Input";
import Button from "../form/Button";
import { useState, React, useRef, useEffect, useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import AuthContext from "../context/AuthContext";

const OtpVerificationForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "",""]);
  const [activeInput, setActiveInput] = useState(0);
  const inputRef = useRef();
  const otpRegex=/^[0-9\s]*$/;
  const onChangeHandler = (e, index) => {
    // console.log("value : ",e.target.value)
    if(!otpRegex.test(e.target.value)){
      console.log(otp)
      return 
    }
    setOtp(prevValue =>{
      const newOtpValue=[...prevValue];
      newOtpValue[index]=e.target.value;
      return newOtpValue
    })
    if(inputRef.current?.value!==''){
      setActiveInput(index + 1);
    }
  };
  const handleKeyDown=(e,index)=>{
    if(e.key==="Backspace"){
      if(otp[index]===''){
        setActiveInput(index-1)
      }
    }
  }
  useEffect(()=>{
    console.log("otp array : ",otp)

  },[otp])
  useEffect(() => {
    inputRef.current?.focus();
    // console.log("activeInput", activeInput);
  }, [activeInput]);
  const { auth, changeAuthValue, addAuthValueInLS, removeAuthValueInLS } =
    useContext(AuthContext);
  const authRef = useRef(auth);
  console.log(authRef.current);
  useEffect(() => {
    // console.log("i am in useeffect");
  console.log("i am active input",activeInput)
    const authLS = localStorage.getItem("authenticated");
    console.log("auth from LS", authLS);
    if (authLS === "false" ||authLS===null) {
      console.log("in if");
      navigate("/not-found");
    }

  });
  const handleOtp=async(e)=>{
    const userDataFromLS=JSON.parse(localStorage.getItem('user'));
    console.log(userDataFromLS)
    e.preventDefault()
    const otpValue=otp.join('');
    console.log(otpValue)
    try {
      const {
        data: { statusCode, message },
      } = await axios.post("http://localhost:8000/api/user/verify-otp", {
        owner:userDataFromLS._id,
        otp:otpValue
      });
      console.log(`status code : ${statusCode} message : ${message}`);
      // if (statusCode === 20) {
      //   // console.log(authRef.current);
      //   // console.log("before setAuth", authRef.current);
      //   setAuth((prevAuth) => {
      //     authRef.current = !prevAuth; // update the value of authRef
      //     return !prevAuth; // return the updated value of auth
      //   });
      //   // console.log("after setAuth",authRef.current)
      //   addAuthValueInLS(authRef.current);
      //   localStorage.setItem('user',JSON.stringify(user))
      //   navigate("/auth/email-verification");
      // }
    } catch (error) {
      const {
        response: {
          data: { statusCode, message},
        },
      } = error;
      if (error.response.data !== undefined) {
        console.log(`status code : ${statusCode} message : ${message}`);
      } else {
        console.log(error);
      }
    }
  }
  return (
    <Container>
      <FormContainer className="w-[511px] h-[332px]" onSubmit={handleOtp}>
        <Title className="text-[#FFFFFF] text-xl">
          Please enter the OTP to verify your account
        </Title>
        <div className="flex flex-row mt-2">
          <Title className="text-base mt-0">
            OTP has been sent to your email
          </Title>
          <Title className="text-base text-[#FFFFFF] mt-0 ml-1.5">
            ex***gmail.com
          </Title>
        </div>
        <div className="flex flex-row mt-10 items-center">
          {otp.map((value, index) => (
            <Input
              key={index}
              type="text"
              value={otp[index] || ""}
              ref={activeInput === index ? inputRef : null}
              pattern="[0-9]"
              inputMode="numeric"
              maxLength={1}
              onChange={(e) => onChangeHandler(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-12 w-12 mr-3 appearance-none text-center font-semibold"
            />
          ))}
        </div>
        <Button className="h-[45px] w-[269px] mt-10" type="submit">Verify Account</Button>
      </FormContainer>
    </Container>
  );
};

export default OtpVerificationForm;
