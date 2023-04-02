import FormContainer from "../form/FormContainer";
import Container from "../users/Container";
import Title from "../form/Title";
import Input from "../form/Input";
import Label from "../form/Label";
import Button from "../form/Button";
const ConfirmPasswordForm = () => {
  return (
    <Container>
      <FormContainer className="h-[320px] w-[511px]">
        <Title className="text-white">Enter New Password</Title>
        <div className="mt-5">
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="********"
            className="h-[45px] w-[361px] p-2"
          />
        </div>
        <div className="mt-5">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="********"
            className="h-[45px] w-[361px] p-2"
          />
        </div>
        <Button className="h-[45px] w-[269px] mt-5">Send Link</Button>
      </FormContainer>
    </Container>
  );
};

export default ConfirmPasswordForm;
