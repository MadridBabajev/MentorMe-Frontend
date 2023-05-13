import {IRegisterData} from "../dto/identity/IRegisterData";
import { MouseEvent } from "react"

export interface IRegisterProps {
    values: IRegisterData;
    validationErrors: string[];
    handleChange: (target: EventTarget & HTMLInputElement) => void;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}