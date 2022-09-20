import React from "react";
import './RegisterFormOne.css';
import {TextInput} from "../../../../components/TextInput/TextInput";
import { ValidatedInput} from "../../../../components/ValidatedInput/ValidatedInput";

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
                <ValidatedInput name={"firstName"} label={"First"} errorMessage={"Please enter your name."} validator={() => true} changeValue={updateUser} />
                <ValidatedInput name={"lastName"} label={"Last"} errorMessage={"Please enter your last name."} validator={() => true} changeValue={updateUser} />
                <ValidatedInput name={"email"} label={"Email"} errorMessage={"Please enter a valid email."} validator={() => true} changeValue={updateUser} />
            </div>
        </div>
    )
}