import {IRegisterData} from "../../../types/dto/identity/IRegisterData";
import {ILoginData} from "../../../types/dto/identity/ILoginData";
import {Patterns} from "../../../types/strings/Patterns";
import {ValidationErrors} from "../../../types/strings/ValidationErrors";

export const ValidateAuthenticationInputs = (values: ILoginData | IRegisterData): string[] => {
    const validationErrors: string[] = [];

    if ('confirmPassword' in values) { // values is of type IRegisterData

        const registerProps = values as IRegisterData;

        if (registerProps.email.length === 0) validationErrors.push(ValidationErrors.EMAIL_REQUIRED);
        if (registerProps.password.length === 0) validationErrors.push(ValidationErrors.PASSWORD_REQUIRED);
        if (registerProps.firstName.length === 0) validationErrors.push(ValidationErrors.FIRST_NAME_REQUIRED);
        if (registerProps.lastName.length === 0) validationErrors.push(ValidationErrors.LAST_NAME_REQUIRED);
        if (registerProps.mobilePhone.length === 0) validationErrors.push(ValidationErrors.MOBILE_REQUIRED);

        const emailRegex = new RegExp(Patterns.VALID_EMAIL);
        const passwordRegex = new RegExp(Patterns.VALID_PASSWORD);

        if (!emailRegex.test(registerProps.email)) validationErrors.push(ValidationErrors.EMAIL_INVALID);
        if (!passwordRegex.test(registerProps.password)) validationErrors.push(ValidationErrors.WEAK_PASSWORD);

        if (registerProps.password !== registerProps.confirmPassword) validationErrors.push(ValidationErrors.PASSWORDS_MISMATCH);
    } else if ('email' in values) { // values is of type ILoginData
        const loginProps = values as ILoginData;
        if (loginProps.email.length === 0) validationErrors.push(ValidationErrors.EMAIL_REQUIRED);
        if (loginProps.password.length === 0) validationErrors.push(ValidationErrors.PASSWORD_REQUIRED);
    }

    return validationErrors;
}