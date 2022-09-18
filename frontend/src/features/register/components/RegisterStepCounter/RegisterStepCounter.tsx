import React from "react";
import {displayIcon, iconClass} from "../../utils/RegisterStepUtils";
import './RegisterStepCounter.css';
interface RegisterStepProps {
    step: number;
    changeStep(): void
}
export const RegisterStepCounter:React.FC<RegisterStepProps> = (props:RegisterStepProps) => {
    return (
        <div className="reg-step-counter-container">
            <div className={iconClass(props.step)} onClick={props.changeStep}>
                {displayIcon(props.step)}
            </div>
            <span className="reg-step-number">
                Step {props.step} of 6
            </span>
        </div>
    )
}