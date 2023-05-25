import {ISubjectFilterElement} from "../../dto/domain/subjects/ISubjectFilterElement";
import {IReserveLessonValues} from "./IReserveLessonValues";

export interface ISubjectSelectionProps {
    subjects: ISubjectFilterElement[];  // Assuming ISubject is the interface for subjects
    reserveLessonValues: IReserveLessonValues;  // Assuming IReserveLessonValues is the interface for reserveLessonValues
    setReserveLessonValues: (values: IReserveLessonValues) => void;  // Assuming this function type
}