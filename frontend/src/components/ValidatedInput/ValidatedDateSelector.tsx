import React from "react";
import {StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidatedSelectStyle} from "../../utils/DetermineStyleUtils";

interface ValidatedDateSelectorProps{
    style:string;
    valid:boolean;
    name:string;
    dropDown():JSX.Element[]
}

export const ValidatedDateSelector:React.FC<ValidatedDateSelectorProps> = (props: ValidatedDateSelectorProps) => {
    const [active, setActive] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);
    const [color, setColor] = React.useState<string>('gray');
    React.useEffect(() => {
        setColor(determineValidatedSelectStyle(active, props.valid));
    }, [active, props.valid, value]);
    const changeValue = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Dispatch this change to a reducer");
        console.log('value: ' + e.target.value);
        setValue(+e.target.value); // + changes Change event's value to number in  ts
    }
    const toggleActive = (e:React.FocusEvent<HTMLSelectElement>) => {
        setActive(!active);
    }
    return (
        <div  className={props.style}>
            <StyledInputBox active={active} valid={props.valid}>
                <StyledInputLabel color={color} active={true} valid={props.valid}>
                    {props.name}
                </StyledInputLabel>
                <select onChange={changeValue} onFocus={toggleActive} onBlur={toggleActive}>
                    {props.dropDown()}
                </select>
            </StyledInputBox>
        </div>
    )
}