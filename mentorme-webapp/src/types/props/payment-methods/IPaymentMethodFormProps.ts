import React from "react";
import {INewPaymentMethod} from "../../dto/domain/profiles/INewPaymentMethod";

export interface IPaymentMethodFormProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    values: INewPaymentMethod | undefined;
    validationErrors: string[];
}