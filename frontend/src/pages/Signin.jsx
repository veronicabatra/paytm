import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import Inputs from '../components/Inputs';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';

export default function Signin() {
    return(
        <>
        <div className='h-screen flex justify-center items-center bg-slate-300'>
            <div className=' w-full h-full md:h-max md:w-110 p-8 space-y-1 flex flex-col justify-center bg-white rounded-2xl shadow-2xl'>
            <Heading label={"Sign In"}></Heading>
            <SubHeading label={"Enter your information to login"}></SubHeading>
            <Inputs  label={"Email"}  placeholder={"johndoe@gmail.com"} ></Inputs>
            <Inputs  label={"Password"}  placeholder={"Include special characters"} ></Inputs>
            <Button label={"Sign In"}></Button>
            <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></ButtonWarning>
            </div>
        </div>
        </>
    )
}