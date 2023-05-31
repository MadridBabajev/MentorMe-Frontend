import {IAvailability} from "../../dto/domain/profiles/IAvailability";
import {INewAvailability} from "../../dto/domain/profiles/INewAvailability";
import React from "react";
import {EDayOfTheWeek} from "../../dto/domain/enums/EDayOfTheWeek";

export interface IMyAvailabilityViewsProps {
    availabilities: IAvailability[];
    values: INewAvailability | undefined;
    handleRemove: (availabilityId: string) => void;
    handleChange: (name: keyof INewAvailability, value: string | EDayOfTheWeek) => void;
    handleSubmit: (event: React.FormEvent) => void;
    validationErrors: string[];
    setValidationErrors: (errors: string[]) => void;
}