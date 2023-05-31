import {IPaymentMethodBrief} from "../../dto/domain/profiles/IPaymentMethodBrief";
import {IReserveLessonValues} from "./IReserveLessonValues";

export interface IPaymentMethodsSelectionProps {
    paymentMethods: IPaymentMethodBrief[];
    reserveLessonValues: IReserveLessonValues;
    setReserveLessonValues: (values: IReserveLessonValues) => void;
}