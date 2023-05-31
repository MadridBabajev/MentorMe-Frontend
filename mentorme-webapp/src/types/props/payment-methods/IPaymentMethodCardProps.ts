import {IPaymentMethodDetailed} from "../../dto/domain/profiles/IPaymentMethodDetailed";

export interface IPaymentMethodCardProps {
    paymentMethod: IPaymentMethodDetailed;
    onRemove: (paymentMethodId: string) => void;
}