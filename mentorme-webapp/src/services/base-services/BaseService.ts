import Axios, { AxiosInstance } from 'axios';
import EventEmitter from "events";
import IRefreshTokenModel from "../../types/dto/identity/IRefreshTokenModel";
import {IRefreshTokenResponse} from "../../types/dto/identity/IRefreshTokenResponse";

export abstract class BaseService {
    private static hostBaseURL = "http://localhost:5289/api/";

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

            const token = localStorage.getItem('jwt');
            const refreshToken = localStorage.getItem('refreshToken');
            const expiryTime = localStorage.getItem('jwtExpiry');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            // only refresh token if it's expired, not if it's close to expiry
            if (token && refreshToken && expiryTime && new Date().getTime() > Number(expiryTime)) {
                // Token is expired, refresh it
                const response = await this.axiosForRefresh.post(
                    BaseService.hostBaseURL + "v1/identity/account/RefreshToken",
                    { jwt: token, refreshToken: refreshToken } as IRefreshTokenModel) as IRefreshTokenResponse;

                // Update local storage with new token and expiry time values
                localStorage.setItem('jwt', response.data.jwt);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('jwtExpiry', String(new Date().getTime() + response.data.expiresIn * 1000));

                JwtRefreshEvent.emit('refresh', response.data);
                config.headers.Authorization = `Bearer ${response.data.jwt}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export const JwtRefreshEvent = new EventEmitter();