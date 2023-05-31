import {IPaymentMethodDetailed} from "../../dto/domain/profiles/IPaymentMethodDetailed";
import React from "react";
import {INewPaymentMethod} from "../../dto/domain/profiles/INewPaymentMethod";

export interface IPaymentMethodsViewProps {
    paymentMethods: IPaymentMethodDetailed[];
    handleRemove: (paymentMethodId: string) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    validationErrors: string[];
    values: INewPaymentMethod | undefined;
}