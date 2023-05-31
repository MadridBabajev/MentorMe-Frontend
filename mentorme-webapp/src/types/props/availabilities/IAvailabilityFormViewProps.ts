import {INewAvailability} from "../../dto/domain/profiles/INewAvailability";
import {EDayOfTheWeek} from "../../dto/domain/enums/EDayOfTheWeek";
import React from "react";

export interface IAvailabilityFormViewProps {
    hourOptions: { value: string, label: string }[];
    values: INewAvailability | undefined;
    handleDayChange: (day: EDayOfTheWeek) => void;
    handleFromHourChange: (option: { value: string, label: string } | null) => void;
    handleToHourChange: (option: { value: string, label: string } | null) => void;
    handleSubmit: (event: React.FormEvent) => void;
    validationErrors: string[];
}