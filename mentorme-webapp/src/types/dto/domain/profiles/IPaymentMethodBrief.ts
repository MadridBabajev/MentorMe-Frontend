import {EPaymentMethodType} from "../enums/EPaymentMethodType";
import {IBaseEntity} from "../base/IBaseEntity";

export interface IPaymentMethodBrief extends IBaseEntity{
    paymentMethodType: EPaymentMethodType;
    details: string;
}