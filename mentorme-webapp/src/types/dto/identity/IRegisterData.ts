import {ECountries} from "../domain/ECountries";

export interface IRegisterData {
    password: string;
    confirmPassword: string;
    email: string;
    mobilePhone: string;
    firstName: string;
    lastName: string;
    isTutor: boolean;
    country: ECountries;
}
