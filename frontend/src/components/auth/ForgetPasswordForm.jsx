import Button from "../form/Button"
import FormContainer from "../form/FormContainer"
import Input from "../form/Input"
import Title from "../form/Title"
import Container from "../users/Container"

const ForgetPasswordForm=()=>{
    console.log("hello")
    return(<Container>
        <FormContainer className="h-[207px] w-[511px]">
            <Title className="text-white">Please Enter Your  Email</Title>
            <Input type="email" placeholder="example@gmail.com" className="h-[45px] w-[361px] p-2 mt-5 "/>
            <Button className="h-[45px] w-[269px] mt-5">Send Link</Button>
        </FormContainer>
    </Container>)
}

export default ForgetPasswordForm