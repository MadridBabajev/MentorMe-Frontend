import React from "react";
import {INewAvailability} from "../../dto/domain/profiles/INewAvailability";
import {EDayOfTheWeek} from "../../dto/domain/enums/EDayOfTheWeek";

export interface IAvailabilityFormProps {
    handleChange: (name: keyof INewAvailability, value: string | EDayOfTheWeek) => void;
    handleSubmit: (event: React.FormEvent) => void;
    values: INewAvailability | undefined;
    validationErrors: string[];
    setValidationErrors: (errors: string[]) => void;
}