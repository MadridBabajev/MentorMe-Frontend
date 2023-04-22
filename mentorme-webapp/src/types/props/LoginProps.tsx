import {ILoginData} from "../dto/ILoginData";
import {MouseEvent} from "react";

export interface LoginProps {
    values: ILoginData;
    validationErrors: string[];
    handleChange: (target: EventTarget & HTMLInputElement) => void;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}