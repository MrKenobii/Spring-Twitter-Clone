import React from "react";
import {StyledInputBox, StyledInputLabel} from "./StyledInput";
export const ValidatedTextInput:React.FC = () => {
    const [value, setValue] = React.useState<string>("");
    const [borderActive, setBorderActive] = React.useState<boolean>(false);
    const [labelActive, setLabelActive] = React.useState<boolean>(false);
    const [color, setColor] = React.useState<string>("gray");
    const focus = ():void => {
        setBorderActive(!borderActive);
        if(!value)
            setLabelActive(!labelActive);
    }
    const update = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setValue(e.target.value);
        console.log("Send the info back to the dispatcher");
        //changeValue(e);
    }
    React.useEffect(() => {
        if(value && !labelActive)
            setLabelActive(true);
    }, [value, borderActive, labelActive, color])
    return (
        <div className="validated-text-input">
            <StyledInputBox active={borderActive} valid={true}>
                <StyledInputLabel active={labelActive} color={color} valid={true}>
                    {'label'}
                </StyledInputLabel>
                <input type="text" className="validated-input-value" name={'name'} onFocus={focus} onBlur={focus} onChange={update}/>
            </StyledInputBox>

        </div>
    );
}