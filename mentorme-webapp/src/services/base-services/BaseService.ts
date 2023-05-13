import Axios, { AxiosInstance } from 'axios';
import IJWTResponse from "../../types/dto/identity/IJWTResponse";
import EventEmitter from "events";

// TODO: Make the jwt auto-refreshable !!!!! The problem is that it fails to decode the response received from the endpoint
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
                console.log('Refreshing token...');
                const response = await this.axiosForRefresh.post(
                    BaseService.hostBaseURL + "v1/identity/account/RefreshToken",
                    { jwt: token, refreshToken: refreshToken }) as IJWTResponse | null;  // include the refresh token in the request body
                console.log('Refresh token response:', response);
                // Update local storage with new token and expiry time
                localStorage.setItem('jwt', response!.jwt);
                localStorage.setItem('refreshToken', response!.refreshToken);
                localStorage.setItem('jwtExpiry', String(new Date().getTime() + response!.expiresIn * 1000));

                JwtRefreshEvent.emit('refresh', response);
                // Update the token in the original request
                config.headers.Authorization = `Bearer ${response!.jwt}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }
}

export const JwtRefreshEvent = new EventEmitter();