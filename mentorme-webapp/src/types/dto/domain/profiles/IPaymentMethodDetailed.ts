import {IBaseEntity} from "../base/IBaseEntity";
import {EPaymentMethodType} from "../enums/EPaymentMethodType";
import {EPaymentCountry} from "../enums/EPaymentCountry";

export interface IPaymentMethodDetailed extends IBaseEntity {
    paymentMethodType: EPaymentMethodType;
    details: string;
    cardCvv: string;
    cardExpirationDate: string;
    cardNumber: string;
    ownerFullName: string;
    ownerCountry: EPaymentCountry;
    isBlocked?: boolean | undefined;
}