import {IRegisterData} from "../../types/dto/identity/IRegisterData";

// TODO: Implement better client side validation
export const ValidateRegisterInputs = (registerProps: IRegisterData): boolean => {

    return registerProps.firstName.length === 0 ||
        registerProps.lastName.length === 0 ||
        registerProps.email.length === 0 ||
        registerProps.mobilePhone.length === 0 ||
        registerProps.password.length === 0 ||
        registerProps.password !== registerProps.confirmPassword;
}