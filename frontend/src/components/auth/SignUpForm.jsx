import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Label from "../form/Label";
import Input from "../form/Input";
import Button from "../form/Button";
import FormNav from "../form/FormNav";
import validateForm from "../../helpers/validate-form";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    auth,
    setAuth,
    changeAuthValue,
    addAuthValueInLS,
    removeAuthValueInLS,
  } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onInputHandler = (e, inputHolderName) => {
    setData({ ...data, [inputHolderName]: e.target.value });
    console.log(data);
  };

  const authRef = useRef(auth);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateForm(data);
    const isSignedIn=false;
    if (!ok) return console.log(error);
    try {
      const {
        data: { statusCode, message ,user},
      } = await axios.post("http://localhost:8000/api/user/sign-up", data);
      console.log(`status code : ${statusCode} message : ${message}`);
      if (statusCode === 201) {
        // console.log(authRef.current);
        // console.log("before setAuth", authRef.current);
        setAuth((prevAuth) => {
          authRef.current = !prevAuth; // update the value of authRef
          return !prevAuth; // return the updated value of auth
        });
        // console.log("after setAuth",authRef.current)
        addAuthValueInLS(authRef.current);
        localStorage.setItem('user',JSON.stringify(user));
        navigate("/auth/email-verification",{state:{isSignedIn}});
        // <Navigate to="/auth/email-verification" state={{isSignedIn}}/>
        console.log("navigate")
      }
    } catch (error) {
      const {
        response: {
          data: { statusCode, message},
        },
      } = error;
      if (data !== undefined) {
        console.log(`status code : ${statusCode} message : ${message}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <FormContainer
        className="h-[540px] w-[322px] mt-8"
        onSubmit={onFormSubmit}
      >
        <Title className="text-xl">Sign up</Title>
        <div className="flex flex-col mt-10">
          <Label>Name</Label>
          <Input
            placeholder="John Doe"
            type="text"
            className="p-2 w-[269px]"
            value={data.name || ''}
            onChange={(e) => onInputHandler(e, "name")}
          />
        </div>
        <div className="flex flex-col mt-10">
          <Label>Email</Label>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            className="p-2 w-[269px]"
            value={data.email || ''}
            onChange={(e) => onInputHandler(e, "email")}
          />
        </div>
        <div className="flex flex-col mt-10">
          <Label>Password</Label>
          <Input
            placeholder="********"
            type="password"
            className="p-2 w-[269px]"
            value={data.password || ''}
            onChange={(e) => onInputHandler(e, "password")}
          />
        </div>
        <Button className="mt-10" type="submit">
          Sign up
        </Button>
        <div className="flex flex-row justify-around w-full mt-10">
          <FormNav to="/auth/forget-password">Forget Password</FormNav>
          <FormNav to="/auth/sign-in">Sign in</FormNav>
        </div>
      </FormContainer>
    </Container>
  );
};

export default SignUpForm;
