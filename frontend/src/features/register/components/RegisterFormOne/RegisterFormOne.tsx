import React from "react";
import './RegisterFormOne.css';
import {TextInput} from "../../../../components/TextInput/TextInput";

interface FormOneState{
    firstName: string;
    lastName: string;
    email: string;
    dataOfBirth: string;
}

export const RegisterFormOne:React.FC = () => {
    const [stepOneState, setStepOneState] =React.useState<FormOneState>({
        firstName: '',
        lastName: '',
        email: '',
        dataOfBirth: ''
    });
    React.useEffect(() => {
        console.log("State change: ", stepOneState);
    }, [stepOneState]);
    const updateUser = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setStepOneState({...stepOneState, [e.target.name]: e.target.value})
    }
    return(
        <div className="reg-step-one-container">
            <div className="reg-ste-one-content">
                <TextInput name={"firstName"} label={"First"} errorMessage={"Please enter your name"} onchange={updateUser} />
                <TextInput name={"lastName"} label={"Last"} errorMessage={"Please enter your last name"} onchange={updateUser} />
                <TextInput name={"email"} label={"Email"} errorMessage={"Please enter a valid email"} onchange={updateUser} />
            </div>
        </div>
    )
}