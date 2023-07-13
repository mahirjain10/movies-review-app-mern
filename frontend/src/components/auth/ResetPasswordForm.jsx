import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Input from "../form/Input";
import Label from "../form/Label";
import Button from "../form/Button";
import useAPI from "../hooks/useApi";
import verifyResetTokenApi from "../../apis/verifyResetTokenApi";
import ThemeContext from "../context/Theme";
import useInputError from "../hooks/useInputError";
import ErrorLine from "../form/ErrorLine";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { ToastContainer } from "react-toastify";

const ResetPasswordForm = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");
  const id = urlParams.get("id");
  
  const { theme } = useContext(ThemeContext);
  const { error, response, disabled, request, setResponse } = useAPI(verifyResetTokenApi);
  
  const [isValid, setIsValid] = useState();

  const tokenCredentials = {
    owner: id,
    token: token,
  };
  const [data, setData] = useState({
    newPass: null,
    confirmPass: null,
  });
  const dataRef=useRef(data);
  const { onInputChangeError, onSubmitError, errorRef } = useInputError(data);
  
  useEffect(() => {
    request(false, tokenCredentials);
  }, []);

  useEffect(() => {
    if (response?.data.valid) {
      setIsValid(true);
    }
    console.log(response);
  }, [response]);

  const onChangeHanlder=(e)=>{
    setData((prevData) => {
      const updatedData = { ...prevData, [e.target.name]: e.target.value };
      return updatedData;
    });
    onInputChangeError(e.target.name,dataRef)
  }
  // if(isValid){
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
        <FormContainer className="h-[320px]auto w-[511px]">
          <Title className="text-white">Enter New Password</Title>
          <div className="mt-5">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="********"
              className="h-[45px] w-[361px] p-2"
              name="new-password"
            />
          </div>
          <ErrorLine className="w-[361px] mt-[5px] mb-[5px] pl-[3px]"> 
            {/* {errorRef.current.name} */} confirm password
          </ErrorLine>
          <div className="mt-5">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="********"
              className="h-[45px] w-[361px] p-2"
              name="confirm-password"
            />
          </div>
          <ErrorLine className="w-[361px] mt-[5px] mb-[5px] pl-[3px]"> 
            {/* {errorRef.current.name} */} confirm password
          </ErrorLine>
          <Button className="h-[45px] w-[269px] mt-5 mb-5">Send Link</Button>
        </FormContainer>
      </Container>
    </>
  );
  // }
  // else{
  // return(<Container>
  //     <FormContainer className="h-[100px] w-[600px]" displayForm={false}>
  //       <Title className="text-3xl mt-0">Sorry token is not valid</Title>
  //     </FormContainer>
  // </Container>)
  // }
};

export default ResetPasswordForm;
