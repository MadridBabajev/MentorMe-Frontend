import {ILoginData} from "../../dto/identity/ILoginData";
import {MouseEvent} from "react";

export interface ILoginProps {
    values: ILoginData;
    validationErrors: string[];
    handleChange: (target: EventTarget & HTMLInputElement) => void;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}