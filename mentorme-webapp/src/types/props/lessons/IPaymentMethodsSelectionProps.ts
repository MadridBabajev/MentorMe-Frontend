import {IPaymentMethodBrief} from "../../dto/domain/profiles/IPaymentMethodBrief";
import {IReserveLessonValues} from "./IReserveLessonValues";

export interface IPaymentMethodsSelectionProps {
    paymentMethods: IPaymentMethodBrief[];  // Assuming IPaymentMethod is the interface for paymentMethods
    reserveLessonValues: IReserveLessonValues;  // Assuming IReserveLessonValues is the interface for reserveLessonValues
    setReserveLessonValues: (values: IReserveLessonValues) => void;  // Assuming this function type
}