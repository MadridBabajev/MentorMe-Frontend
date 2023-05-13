import IJWTResponse from "../../types/dto/identity/IJWTResponse"
import { ILoginData } from "../../types/dto/identity/ILoginData";
import { IRegisterData } from "../../types/dto/identity/IRegisterData";
import { BaseService } from "../base-services/BaseService";
import {ILogout} from "../../types/dto/identity/ILogout";

export class IdentityService extends BaseService {
    constructor() {
        super('v1/identity/account/');
    }

    async register(data: IRegisterData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('register', data);

            console.log('register response', response);
            if (response.status === 200) {
                return response.data as IJWTResponse;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async login(data: ILoginData): Promise<IJWTResponse | undefined> {
        try {
            const response = await this.axios.post<IJWTResponse>('login', data);

            console.log('login response', response);
            if (response.status === 200) {
                return response.data as IJWTResponse;
            }
            return undefined;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async logout(data: ILogout): Promise<boolean> {
        try {
            const response = await this.axios.post('logout', data);
            console.log('logout response', response);
            return response.status === 200;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return false;
        }
    }

}