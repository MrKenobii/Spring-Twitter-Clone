import React from "react";

interface TextInputProps {
    name: string;
    label: string;
    errorMessage: string;
    onchange(e:React.ChangeEvent<HTMLInputElement>): void;
    maxLength?:number;
    validator?(value:string):boolean;
}

export const TextInput: React.FC<TextInputProps> = ({name, label,errorMessage,onchange,maxLength,validator}) => {
    const [inputValue, setInputValue] =React.useState<String>("");
    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onchange(e);
        setInputValue(e.target.value);
    }
    return (
        <div className="text-input">
            <div>
                <span>{label}</span>
                <input type="text" name={name} onChange={updateInput}/>
            </div>
        </div>
    )
}