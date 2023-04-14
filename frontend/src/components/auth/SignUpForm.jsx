  import FormContainer from "../form/FormContainer";
  import Container from "../users/Container";
  import Title from "../form/Title";
  import Label from "../form/Label";
  import Input from "../form/Input";
  import Button from "../form/Button";
  import FormNav from "../form/FormNav";
  import { useContext, useState, useRef, useEffect, useCallback } from "react";
  import { useNavigate, Navigate } from "react-router-dom";
  import axios from "axios";
  import AuthContext from "../context/AuthContext";
  import ErrorLine from "../form/ErrorLine";
  import validateForm from "../../helpers/validate-form";
  // import InputErrorContext from "../context/InputError";

  const SignUpForm = () => {
    const [height,setHeight]=useState(700);
    const navigate = useNavigate();
    const {
      auth,
      setAuth,
      changeAuthValue,
      addAuthValueInLS,
      removeAuthValueInLS,
    } = useContext(AuthContext);

    // const { data, setData, inputError, setInputError } =
    //   useContext(InputErrorContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
      });
        const [inputError, setInputError] = useState({
      name: "",
      email: "",
      password: "",
    });
    const dataRef=useRef(data)
    const errorRef=useRef(inputError);
    const onInputHandler = (e, inputHolderName) => {

      dataRef.current[inputHolderName] = e.target.value;
      setData(prevData=>{
        const updatedData={...prevData,[inputHolderName] :e.target.value}
        dataRef.current=updatedData;
        return updatedData
      })
      console.log("data : :",dataRef.current);
      const {ok,error}=validateForm(data.name,data.email,data.password,inputHolderName)
      console.log(ok,error)
      setInputError(prevData=>{
        const updatedData={...prevData,[inputHolderName] :error}
        errorRef.current=updatedData;
        setHeight(prev=>prev+10);
        return updatedData
      })
      console.log("error :", errorRef.current)
    }

    const authRef = useRef(auth);

    const onFormSubmit = async (e) => {
      e.preventDefault();
      // if(inputError.ok===false){
      //   return
      // }
      try {
        const {
          data: { statusCode, message, user },
        } = await axios.post("http://localhost:8000/api/user/sign-up", data);
        console.log(`status code : ${statusCode} message : ${message}`);
        if (statusCode === 201) {
          setAuth((prevAuth) => {
            authRef.current = !prevAuth; // update the value of authRef
            return !prevAuth; // return the updated value of auth
          });
          // console.log("after setAuth",authRef.current)
          addAuthValueInLS(authRef.current);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/auth/email-verification")
          console.log("navigate");
        }
      } catch (error) {
        const {
          response: {
            data: { statusCode, message },
          },
        } = error;
        if (data !== undefined) {
          console.log(`status code : ${statusCode} message : ${message}`);
        } else {
          console.log(error);
        }
      }
    };
    console.log("i am running")
    return (
      <Container>
        <FormContainer
          className={`h-[510px] w-[322px] mt-8`}
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
              onChange={(e) => onInputHandler(e, "name")}
            />
            {/* < ErrorLine>{errorRef.current.name}</ErrorLine>   */}
          </div>
          <div className="flex flex-col mt-8">
            <Label>Email</Label>
            <Input
              placeholder="johndoe@gmail.com"
              type="email"
              className="p-2 w-[269px]"
              value={data.email || ""}
              onChange={(e) => onInputHandler(e, "email")}
            />
            {/* <ErrorLine>{errorRef.current.email}</ErrorLine>  */}
          </div>
          <div className="flex flex-col mt-8">
            <Label>Password</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              className="p-2 w-[269px]"
              value={data.password || ""}
              onChange={(e) => onInputHandler(e, "password")}
            />
            {/* <ErrorLine>{errorRef.current.password}</ErrorLine>   */}
          </div>
          <Button className="mt-8" type="submit">
            Sign up
          </Button>
          <div className="flex flex-row justify-around w-full mt-8">
            <FormNav to="/auth/forget-password">Forget Password</FormNav>
            <FormNav to="/auth/sign-in">Sign in</FormNav>
          </div>
        </FormContainer>
      </Container>
    );
  };

  export default SignUpForm;
