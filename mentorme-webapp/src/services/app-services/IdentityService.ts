import IJWTResponse from "../../types/dto/identity/IJWTResponse"
import { ILoginData } from "../../types/dto/identity/ILoginData";
import { IRegisterData } from "../../types/dto/identity/IRegisterData";
import { BaseService } from "../base-services/BaseService";
import {ILogout} from "../../types/dto/identity/ILogout";
import {IdentityServiceResponse} from "../../types/dto/identity/IdentityServiceResponse";
import { AxiosError } from 'axios';
import {IServerError} from "../../types/errors/IServerError";

export class IdentityService extends BaseService {
    constructor() {
        super('v1/identity/account/');
    }

    async register(data: IRegisterData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post('register', data);

            if (response.status === 200) {
                return [response.data, null];
            } else {
                return [null, { Error: response.data.error }];
            }
        } catch (error) {
            const axiosError = error as AxiosError<IServerError>;
            console.log('error: ', axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    async login(data: ILoginData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post<IJWTResponse>('login', data);

            if (response.status === 200) {
                return [response.data, null];
            }
            return [null, { Error: "Response status is not 200" }];
        } catch (e) {
            const axiosError = e as AxiosError<IServerError>;
            console.log('error: ', axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    async logout(data: ILogout): Promise<boolean> {
        try {
            const response = await this.axios.post('logout', data);
            return response.status === 200;
        } catch (e) {
            console.log('error: ', (e as Error).message);
            return false;
        }
    }

}