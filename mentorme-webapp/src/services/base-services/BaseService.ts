import Axios, { AxiosInstance } from 'axios';

export abstract class BaseService {
    private static hostBaseURL = "http://localhost:5289/api/";

    protected axios: AxiosInstance;

    protected constructor(baseUrl: string) {
        this.axios = Axios.create();

        this.axios.defaults.baseURL = BaseService.hostBaseURL + baseUrl;
        this.axios.defaults.headers.common['Content-Type'] = 'application/json';

        this.axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2));
            return request;
        });
    }
}