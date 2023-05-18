import {IRegisterData} from "../../types/dto/identity/IRegisterData";
import {ILoginData} from "../../types/dto/identity/ILoginData";

// TODO: Implement better client side validation
export const ValidateAuthenticationInputs = (values: ILoginData | IRegisterData): string[] => {
    const validationErrors: string[] = [];

    if ('confirmPassword' in values) { // this means values is of type IRegisterData
        // same as before, but moved 'email' and 'password' checks from the bottom to here.
        const registerProps = values as IRegisterData;

        if (registerProps.email.length === 0) validationErrors.push("Email is required");
        if (registerProps.password.length === 0) validationErrors.push("Password is required");
        if (registerProps.firstName.length === 0) validationErrors.push("First name is required");
        if (registerProps.lastName.length === 0) validationErrors.push("Last name is required");
        if (registerProps.mobilePhone.length === 0) validationErrors.push("Mobile phone is required");

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$/;

        if (!emailRegex.test(registerProps.email)) validationErrors.push("Email is invalid");
        if (!passwordRegex.test(registerProps.password)) validationErrors.push("Password does not meet the requirements");

        if (registerProps.password !== registerProps.confirmPassword) validationErrors.push("Passwords do not match");
    } else if ('email' in values) { // this means values is of type ILoginData
        const loginProps = values as ILoginData;
        if (loginProps.email.length === 0) validationErrors.push("Email is required");
        if (loginProps.password.length === 0) validationErrors.push("Password is required");
    }

    return validationErrors;
}