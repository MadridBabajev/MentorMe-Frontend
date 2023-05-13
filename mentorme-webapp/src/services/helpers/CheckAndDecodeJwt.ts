import jwt_decode from 'jwt-decode';
import {IJwtPayload} from "../../types/dto/identity/IJwtPayload";
import IJWTResponse from "../../types/dto/identity/IJWTResponse";

export function checkAndDecodeJWT(jwtResponse: IJWTResponse | null) {
    let id = '';
    let decodedJwtData: IJwtPayload | null = null;

    if(jwtResponse) {
        decodedJwtData = jwt_decode(jwtResponse.jwt) as IJwtPayload;
        id = decodedJwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } else {
        const jwtToken = localStorage.getItem('jwt'); // Get the JWT token from local storage
        if (jwtToken) {
            decodedJwtData = jwt_decode(jwtToken) as IJwtPayload;
            id = decodedJwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        }
    }

    return { id, decodedJwtData };
}