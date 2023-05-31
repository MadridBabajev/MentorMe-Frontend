import {ISubjectFilterElement} from "../../dto/domain/subjects/ISubjectFilterElement";
import {IReserveLessonValues} from "./IReserveLessonValues";

export interface ISubjectSelectionProps {
    subjects: ISubjectFilterElement[];
    reserveLessonValues: IReserveLessonValues;
    setReserveLessonValues: (values: IReserveLessonValues) => void;
}