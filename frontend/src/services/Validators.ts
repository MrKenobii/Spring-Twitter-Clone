import {Dob} from "../utils/GlobalInterfaces";

export const validateName = (value: string): boolean => {
    return value !== '';
}
export const validateDob = (dob: Dob): boolean => {
    let {month, day, year } = dob;
    let leapYears: number[] =[];
    for(let i = 2022; i> 1922; i-=4){
        leapYears.push(i);
    }
    if(!month || !day || !year)
        return false;
    else if(month === 2 && day > 29)
        return false;
    else if(month === 2 && day === 29 && !leapYears.includes(year))
        return false;
    else if((month === 4 || month === 6 || month === 9 || month === 11) && day> 30)
        return false;
    return true;
}