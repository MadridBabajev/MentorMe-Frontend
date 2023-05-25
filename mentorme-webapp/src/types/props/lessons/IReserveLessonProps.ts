import {IReserveLessonData} from "./IReserveLessonData";
import {IReserveLessonValues} from "./IReserveLessonValues";
import React from "react";
import {TimeSlot} from "../../../routes/authorized/ReserveLesson";

export interface IReserveLessonProps {
    onReserve: () => void;
    handleSelectTime: (timeSlot: TimeSlot) => void;
    reserveLessonData: IReserveLessonData | null;
    reserveLessonValues: IReserveLessonValues;
    selectedTimeSlot: TimeSlot | null;
    setReserveLessonValues: React.Dispatch<React.SetStateAction<IReserveLessonValues>>;
    showValidationMessage: boolean;
}