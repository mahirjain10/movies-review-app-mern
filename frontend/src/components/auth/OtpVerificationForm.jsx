import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Input from "../form/Input";
import Button from "../form/Button";
import { useState, React, useRef, useEffect, useContext } from "react";
import { otpSchema } from "../../validation/formValidation";
import ErrorLine from "../form/ErrorLine";
import useAPI from "../hooks/useApi";
import submitOtpApi from "../../apis/submitOtpApi";

const OtpVerificationForm = () => {
  const { error, response,disabled, request ,setResponse}=useAPI(submitOtpApi);
  const [otp, setOtp] = useState(["", "", "", "", "",""]);
  const [activeInput, setActiveInput] = useState(0);
  const [OtpInputError,setOtpInputError]=useState(null)
  const inputRef = useRef();
  const otpRegex = /^[0-9\s]*$/;
  const onChangeHandler = (e, index) => {
    if (!otpRegex.test(e.target.value)) {
      console.log(otp);
      return;
    }
    setOtp((prevValue) => {
      const newOtpValue = [...prevValue];
      newOtpValue[index] = e.target.value;
      return newOtpValue;
    });
    if (inputRef.current?.value !== "") {
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        setActiveInput(index - 1);
      }
    }
  };

  // useEffect(() => {
  //   console.log("otp array : ", otp);
  // }, [otp]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeInput]);

  const handleOtp = async (e) => {
      e.preventDefault();
      const otpStr=otp.join('').toString();
      console.log(otpStr)
      try{
        console.log("in try")
        const validData=await otpSchema.validate({otp:otpStr},{abortEarly:false})
        console.log("valid data",validData);
        request(true,{otp:otpStr});
      }
      catch(error){
        console.log(error)
          const errors = {};
          error.inner.forEach(e => {
            errors[e.path] = e.message;
          });
          console.log(errors);
          setOtpInputError(errors);
      } 
  };
  return (
    <Container>
      <FormContainer className="w-[511px] h-[310px]" onSubmit={handleOtp}>
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
        <ErrorLine className="w-[511px] mt-5 text-center text-lg">{OtpInputError?.otp}</ErrorLine>
        <Button className={`h-[45px] w-[269px] ${OtpInputError===null ? "mt-10" : "mt-5"}`} type="submit">
          Verify Account
        </Button>
      </FormContainer>
    </Container>
  );
};

export default OtpVerificationForm;
