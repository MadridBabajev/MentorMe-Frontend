import {IBaseEntity} from "../base/IBaseEntity";
import {EPaymentMethodType} from "../enums/EPaymentMethodType";

export interface IStudentPaymentMethod extends IBaseEntity{
    paymentMethodType: EPaymentMethodType;
    details: string | null;
}