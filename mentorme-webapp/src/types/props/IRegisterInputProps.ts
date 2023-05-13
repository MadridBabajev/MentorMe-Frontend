
export interface IRegisterInputProps {
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    placeholder: string;
    value: string;
    label: string;
    maxLength?: number;
    handleChange: (target: EventTarget & HTMLInputElement) => void;
}
