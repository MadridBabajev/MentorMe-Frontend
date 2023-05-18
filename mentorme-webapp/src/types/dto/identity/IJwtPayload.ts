export interface IJwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string; // Id
    [key: string]: any; // This line is needed because the payload can have other properties as well.
}