import IJWTResponse from "../../types/dto/identity/IJWTResponse"
import { ILoginData } from "../../types/dto/identity/ILoginData";
import { IRegisterData } from "../../types/dto/identity/IRegisterData";
import { BaseService } from "../base-services/BaseService";
import {ILogout} from "../../types/dto/identity/ILogout";
import {IdentityServiceResponse} from "../../types/dto/identity/IdentityServiceResponse";
import { AxiosError } from 'axios';
import {IServerError} from "../../types/errors/IServerError";
import {HostURLs} from "../../types/strings/HostURLs";

export class IdentityService extends BaseService {
    constructor() {
        super(HostURLs.ACCOUNT_CONTROLLER);
    }

    async register(data: IRegisterData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post(HostURLs.REGISTER, data);

            if (response.status === 200) {
                return [response.data, null];
            } else {
                return [null, { Error: response.data.error }];
            }
        } catch (error) {
            const axiosError = error as AxiosError<IServerError>;
            console.error('error: ' + axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    async login(data: ILoginData): Promise<IdentityServiceResponse> {
        try {
            const response = await this.axios.post<IJWTResponse>(HostURLs.LOGIN, data);

            if (response.status === 200) {
                return [response.data, null];
            }
            return [null, { Error: "Response status is not 200" }];
        } catch (e) {
            const axiosError = e as AxiosError<IServerError>;
            console.error('error: ' + axiosError.message);
            return [null, { Status: axiosError.response?.status, Error: axiosError.response?.data.Error || axiosError.message }];
        }
    }

    async logout(data: ILogout): Promise<boolean> {
        try {
            const response = await this.axios.post(HostURLs.LOGOUT, data);
            return response.status === 200;
        } catch (e) {
            console.error('error: ' + e);
            return false;
        }
    }

}