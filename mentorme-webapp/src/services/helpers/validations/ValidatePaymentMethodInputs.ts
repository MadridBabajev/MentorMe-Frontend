import {INewPaymentMethod} from "../../../types/dto/domain/profiles/INewPaymentMethod";
import {ValidationErrors} from "../../../types/strings/ValidationErrors";

export const ValidatePaymentMethodInputs = (values: INewPaymentMethod | undefined): string[] => {
    const validationErrors: string[] = [];

    if (values === undefined) {
        validationErrors.push(ValidationErrors.VALUES_NOT_SET);
        return validationErrors;
    }

    Object.keys(values).forEach((key) => {
        const value = values[key as keyof INewPaymentMethod];
        if (typeof value === 'string') {
            if (value.length === 0) {
                validationErrors.push(`* ${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
            }
            else if (key !== "ownerCountry" && (value.length < 5 || value.length > 32)) {
                validationErrors.push(`* ${key.charAt(0).toUpperCase() + key.slice(1)} must have at least 5 characters and up to 32 characters`);
            }
        }
    });

    return validationErrors;
}