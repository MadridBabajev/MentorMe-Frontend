import {IRegisterData} from "../dto/IRegisterData";
import { MouseEvent } from "react"

export interface RegisterProps {
    values: IRegisterData;
    validationErrors: string[];
    handleChange: (target: EventTarget & HTMLInputElement) => void;
    onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
}