import {IPaymentMethodDetailed} from "../../types/dto/domain/profiles/IPaymentMethodDetailed";
import {BaseEntityService} from "../base-services/BaseEntityService";
import {INewPaymentMethod} from "../../types/dto/domain/profiles/INewPaymentMethod";
import {HostURLs} from "../../types/strings/HostURLs";
import {Specifiers} from "../../types/strings/Specifiers";

export class PaymentMethodService extends BaseEntityService<IPaymentMethodDetailed> {
    constructor() {
        super(HostURLs.PAYMENT_METHOD_CONTROLLER);
    }

    async deletePaymentMethod(paymentMethodId: string) {
        try {
            return await this.axios.delete(HostURLs.REMOVE_PAYMENT_METHOD + `${Specifiers.PAYMENT_METHOD}${paymentMethodId}`);
        } catch (error) {
            console.error(`Failed to remove a payment method: ${error}`);
        }
    }

    async addPaymentMethod(initialPaymentMethod: INewPaymentMethod) {
        try {
            return await this.axios.post(HostURLs.ADD_PAYMENT_METHOD, initialPaymentMethod);
        } catch (error) {
            console.error(`Failed to add a new payment method: ${error}`);
        }
    }
}
