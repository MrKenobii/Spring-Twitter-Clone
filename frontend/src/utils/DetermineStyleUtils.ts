import {StyledInputProps, ValidatedInputState} from "./GlobalInterfaces";

export const determineStyledInputBorder = (props: StyledInputProps): string => {
    let {active, valid, theme }=props;
    if(!active && valid) return `1px solid ${theme.colors.lightGray}`;
    if(!active && !valid) return `1px solid ${theme.colors.error}`;
    if(active && valid) return `2px solid ${theme.colors.blue}`;
    if(active && !valid) return `2px solid ${theme.colors.error}`;
    return "";
}
export const determineLabelColor = (props: StyledInputProps) : string => {
    let { active, valid ,theme, color} = props;
    if(color && color === 'error') return theme.colors.error;
    if(color && color === 'blue') return theme.colors.blue;
    return theme.colors.gray;
}

export const determineValidatedStyles = (state: ValidatedInputState, validator: (value: string) => boolean): ValidatedInputState => {
    let {valid, active, typedIn, value, labelColor, labelActive} = state;
    if(typedIn){
        valid = validator(value);
        if(active && valid){
            labelActive = true;
            labelColor = '#1DA1F1';
        }
        if(active && !valid){
            labelActive=true;
            labelColor="error";
        }
        if(!active && valid){
            labelActive=true;
            labelColor="#7F7E7F";
        }
        if(!active && !valid){
            labelActive = false;
            labelColor="#7F7E7F";
        } else {
            if(active){
                labelActive=true;
                labelColor="#1DA1F1";
            } else {
                labelActive=false;
                labelColor="#7F7E7F";
            }
        }
    }
    state = {
        ...state,
        valid,
        labelColor,
        labelActive
    };
    return state;
}