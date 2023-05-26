import Input from "../form/Input";
import Label from "../form/Label";
import Button from "../form/Button";
import Title from "../form/Title";
import Container from "../users/Container";
import FormContainer from "../form/FormContainer";
import FormNav from "../form/FormNav";
import { useState, useRef,useContext } from "react";
import useInputError from "../hooks/useInputError";
import ErrorLine from "../form/ErrorLine";
import useAPI from "../hooks/useApi";
import { ToastContainer } from "react-toastify";
import ThemeContext from "../context/Theme";
import signIpApi from "../../apis/signInApi";
import { signInSchema } from "../../validation/formValidation";
const SignInForm = () => {
  const [data, setData] = useState({
    email: null,
    password: null,
  });
  const { theme } = useContext(ThemeContext);

  const { onInputChangeError, onSubmitError, errorRef } = useInputError(data,signInSchema);
  const dataRef = useRef(data);
  const { error, disabled, request } = useAPI(signIpApi);
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
    onSubmitError(dataRef.current,request)
    console.log("disavked btn :",disabled)
  }

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
          // disabled={disabled}
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
