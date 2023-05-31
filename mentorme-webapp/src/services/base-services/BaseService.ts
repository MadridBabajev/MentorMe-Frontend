import Axios, { AxiosInstance } from 'axios';
import EventEmitter from "events";
import IRefreshTokenModel from "../../types/dto/identity/IRefreshTokenModel";
import {IRefreshTokenResponse} from "../../types/dto/identity/IRefreshTokenResponse";
import {LocalStorage} from "../../types/strings/LocalStorage";
import {RefreshEvents} from "../../types/strings/RefreshEvents";
import {HostURLs} from "../../types/strings/HostURLs";

export abstract class BaseService {
    private static hostBaseURL = HostURLs.HOST_BASE_URL;

    protected axios: AxiosInstance;
    private axiosForRefresh: AxiosInstance;

    protected constructor(baseUrl: string) {
        this.axios = Axios.create();
        this.axiosForRefresh = Axios.create();

        this.axios.defaults.baseURL = BaseService.hostBaseURL + baseUrl;
        this.axios.defaults.headers.common['Content-Type'] = 'application/json';

        // Add a request interceptor
        this.axios.interceptors.request.use(async (config) => {
            console.log('Starting Request', JSON.stringify(config, null, 2));

            const token = localStorage.getItem(LocalStorage.JWT);
            const refreshToken = localStorage.getItem(LocalStorage.REFRESH_TOKEN);
            const expiryTime = localStorage.getItem(LocalStorage.EXPIRY);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // Refresh the token only if it's expired, not if it's close to expiry
            if (token && refreshToken && expiryTime && new Date().getTime() > Number(expiryTime)) {
                // Token is expired, refresh it
                const response = await this.axiosForRefresh.post(
                    BaseService.hostBaseURL + `${HostURLs.ACCOUNT_CONTROLLER}${HostURLs.REFRESH_JWT_TOKEN}`,
                    { jwt: token, refreshToken: refreshToken } as IRefreshTokenModel) as IRefreshTokenResponse;

                // Update local storage with new token and expiry time values
                localStorage.setItem(LocalStorage.JWT, response.data.jwt);
                localStorage.setItem(LocalStorage.REFRESH_TOKEN, response.data.refreshToken);
                localStorage.setItem(LocalStorage.EXPIRY, String(new Date().getTime() + response.data.expiresIn * 1000));

                JwtRefreshEvent.emit(RefreshEvents.JWT_REFRESH_EVENT, response.data);
                config.headers.Authorization = `Bearer ${response.data.jwt}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export const JwtRefreshEvent = new EventEmitter();