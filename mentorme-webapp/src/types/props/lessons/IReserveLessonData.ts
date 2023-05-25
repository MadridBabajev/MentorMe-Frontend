import {IAvailability} from "../../dto/domain/profiles/IAvailability";
import {ISubjectFilterElement} from "../../dto/domain/subjects/ISubjectFilterElement";
import {IPaymentMethodBrief} from "../../dto/domain/profiles/IPaymentMethodBrief";

export interface IReserveLessonData {
    availabilities: IAvailability[];
    subjects: ISubjectFilterElement[];
    paymentMethods: IPaymentMethodBrief[];
}