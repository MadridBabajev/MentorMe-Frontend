import {IBaseEntity} from "../base/IBaseEntity";
import {EPaymentMethodType} from "../enums/EPaymentMethodType";
import {EPaymentStatus} from "../enums/EPaymentStatus";

export interface IPayment extends IBaseEntity {
    date: Date;
    amount: number;
    additionalFees?: number;
    description: string;
    senderStudentFullName: string;
    recipientTutorFullName: string;
    paymentStatus: EPaymentStatus;
    paymentMethodType: EPaymentMethodType;
}