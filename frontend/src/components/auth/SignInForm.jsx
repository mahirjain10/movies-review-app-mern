import Input from "../form/Input";
import Label from "../form/Label";
import Button from "../form/Button";
import Title from "../form/Title";
import Container from "../users/Container";
import FormContainer from "../form/FormContainer"
import FormNav from "../form/FormNav";
const SignInForm = () => {
  return (
    <Container>
      <FormContainer className="w-[322px] h-[435px]">
          <Title className="text-xl">Sign in</Title>
          <div className="flex flex-col mt-10">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              className="p-2 h-11 w-[269px]"
            />
          </div>
          <div className="flex flex-col mt-10">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="*******"
              className="p-2 h-11 w-[269px]"
            />
          </div>
          <Button className="mt-10">Sign In</Button>
          <div className="flex flex-row justify-around w-full mt-10">
            <FormNav to="/auth/forget-password">Forgot Password</FormNav>
            <FormNav to="/auth/sign-up">Sign up</FormNav>
          </div>
      </FormContainer>
    </Container>
        

  );
};

export default SignInForm;
