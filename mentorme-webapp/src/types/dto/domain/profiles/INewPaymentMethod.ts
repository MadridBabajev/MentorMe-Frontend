import {EPaymentCountry} from "../enums/EPaymentCountry";
import {EPaymentMethodType} from "../enums/EPaymentMethodType";

export interface INewPaymentMethod {
    details: string;
    cardCvv: string;
    cardExpirationDate: string;
    cardNumber: string;
    // ownerFullName: string;
    ownerCountry: EPaymentCountry;
    paymentMethodType: EPaymentMethodType;
}
