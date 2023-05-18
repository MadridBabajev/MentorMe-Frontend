import {IJwtPayload} from "./IJwtPayload";

export interface ICheckAndDecodeJWTResponse {
    id: string;
    decodedJwtData: IJwtPayload;
}