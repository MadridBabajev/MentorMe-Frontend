import {IBaseEntity} from "../base/IBaseEntity";
import {ELessonState} from "../enums/ELessonState";

export interface ILessonListElement extends IBaseEntity {
    startTime: Date;
    endTime: Date;
    lessonState: ELessonState;
    tutorFullName: string;
    studentFullName: string;
    subjectName: string;
    lessonPrice: number;
}