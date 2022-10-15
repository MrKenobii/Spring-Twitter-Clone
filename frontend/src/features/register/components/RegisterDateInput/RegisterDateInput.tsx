import React from "react";
import {ValidatedDateSelector} from "../../../../components/ValidatedInput/ValidatedDateSelector";
import {getDays, getMonths, getYears} from "../../../../utils/DateUtils";
import {AppDispatch} from "../../../../redux/Store";
import {useDispatch} from "react-redux";
import {updateRegister} from "../../../../redux/Slices/RegisterSlice";

export const RegisterDateInput:React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const updateState = (name: string, value: string | number | boolean): void => {
        dispatch(updateRegister({
            name,
            value
        }));
    }
    return (
        <div className="register-date">
            <ValidatedDateSelector style={"validated-month"} valid={true} name={"Month"} dropDown={getMonths} dispatcher={updateState} />
            <ValidatedDateSelector style={"validated-day"} valid={true} name={"Day"} dropDown={getDays} dispatcher={updateState} />
            <ValidatedDateSelector style={"validated-year"} valid={true} name={"Year"} dropDown={getYears} dispatcher={updateState} />
        </div>
    )
}