import {ISubjectListElement} from "../subjects/ISubjectListElement";
import {ELessonState} from "../enums/ELessonState";
import {IBaseEntity} from "../base/IBaseEntity";
import {IStudentPaymentMethod} from "../profiles/IStudentPaymentMethod";
import {ITag} from "../profiles/ITag";
import {IProfileCardData} from "../profiles/IProfileCardData";

export interface ILesson extends IBaseEntity {
    paymentId: string,
    startTime: Date;
    endTime: Date;
    lessonState: ELessonState;
    price: number;
    viewedByTutor: boolean;
    userCanWriteReview: boolean;
    studentPaymentMethod: IStudentPaymentMethod;
    subject: ISubjectListElement;
    lessonStudent: IProfileCardData;
    lessonTutor: IProfileCardData;
    tags: ITag[];
}