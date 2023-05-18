import {ILoginData} from "../../../types/dto/identity/ILoginData";
import {IRegisterData} from "../../../types/dto/identity/IRegisterData";

export function isLoginData(values: ILoginData | IRegisterData): values is ILoginData {
    return (values as ILoginData).email !== undefined && (values as ILoginData).password !== undefined;
}