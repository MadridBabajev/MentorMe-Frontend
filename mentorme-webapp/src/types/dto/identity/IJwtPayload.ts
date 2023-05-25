export interface IJwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string; // Id
    [key: string]: any; // The payload and other properties
}