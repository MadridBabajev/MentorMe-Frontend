import { ILoginData } from "../../types/dto/ILoginData";

// TODO: Implement better client side validation
export const ValidateLoginInputs = (registerProps: ILoginData): boolean => {

    return registerProps.email.length == 0 ||
        registerProps.password.length == 0;
}