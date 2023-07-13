import { useState, useContext, useRef } from "react";
import Button from "../form/Button";
import FormContainer from "../form/FormContainer";
import Input from "../form/Input";
import Title from "../form/Title";
import Container from "../users/Container";
import useAPI from "../hooks/useApi";
import forgetPasswordApi from "../../apis/forgetPasswordApi";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ThemeContext from "../context/Theme";
import useInputError from "../hooks/useInputError";
import { forgetPasswordSchema } from "../../validation/formValidation";
import ErrorLine from "../form/ErrorLine";

const ForgetPasswordForm = () => {
  const { theme } = useContext(ThemeContext);
  const { error, response, disabled, request, setResponse } = useAPI(forgetPasswordApi);
  const [data, setData] = useState({ email: null });
  const { onInputChangeError, onSubmitError, errorRef } = useInputError(
    data,
    forgetPasswordSchema
  );

  const dataRef=useRef(data);
  const onInputChangeHandler = (e) => {
    dataRef.current[e.target.name] = e.target.value;
    setData({ [e.target.name]: e.target.value });
    onInputChangeError(e.target.name, dataRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitError(dataRef.current,true)
    if (response.data.statusCode === 200) {
      console.log("request successfull");
    }
  };

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
          className="h-[207px]auto w-[511px]"
          displayForm={true}
          onSubmit={handleSubmit}
        >
          <Title className="text-white">Please Enter Your Email</Title>
          <Input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className="h-[45px] w-[361px] p-2 mt-5 "
            onChange={onInputChangeHandler}
            value={data.email || ""}
          />
          <ErrorLine className="w-[269px] mt-[5px] mb-[5px] pl-[3px] text-center">
            {errorRef.current.email}
          </ErrorLine>
          <Button className="h-[45px] w-[269px] mt-3 mb-7" disabled={disabled}>Send Link</Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default ForgetPasswordForm;
