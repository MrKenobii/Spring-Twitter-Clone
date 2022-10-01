import React from "react";
import {ValidatedDateSelector} from "../../../../components/ValidatedInput/ValidatedDateSelector";

export const RegisterDateInput:React.FC = () => {
    return (
        <div className="register-date">
            <ValidatedDateSelector style={"validated-month"} valid={true} name={"Month"} dropDown={() => {return []}} />
            <ValidatedDateSelector style={"validated-day"} valid={true} name={"Day"} dropDown={() => {return []}} />
            <ValidatedDateSelector style={"validated-year"} valid={true} name={"Year"} dropDown={() => {return []}} />
        </div>
    )
}