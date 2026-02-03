import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import Inputs from '../components/Inputs';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';

export default function Signup() {
    return(
        <>
        <div className='h-screen flex justify-center items-center bg-slate-300'>
            <div className=' w-full h-full md:h-max md:w-110 p-8 space-y-1 flex flex-col justify-center bg-white rounded-2xl shadow-2xl'>
            <Heading label={"Sign Up"}></Heading>
            <SubHeading label={"Enter your information to create you account"}></SubHeading>
            <Inputs  label={"First Name"} placeholder={"John"} ></Inputs>
            <Inputs  label={"Last Name"}  placeholder={"Doe"} ></Inputs>
            <Inputs  label={"Email"}  placeholder={"johndoe@gmail.com"} ></Inputs>
            <Inputs  label={"Password"}  placeholder={"Include special characters"} ></Inputs>
            <Button label={"Sign Up"}></Button>
            <ButtonWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}></ButtonWarning>
            </div>
        </div>
        </>
    )
}