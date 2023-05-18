import jwt_decode from 'jwt-decode';
import {IJwtPayload} from "../../types/dto/identity/IJwtPayload";
import IJWTResponse from "../../types/dto/identity/IJWTResponse";
import {JwtContextType} from "../../types/context/JwtContextType";

export const CheckAndDecodeJWT = (context: JwtContextType) => {
    let id = '';
    let decodedJwtData: IJwtPayload | null = null;
    const { jwtResponse, setJwtResponse } = context;

    if(jwtResponse) {
        decodedJwtData = jwt_decode(jwtResponse.jwt) as IJwtPayload;
        id = decodedJwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } else {
        const jwtToken = localStorage.getItem('jwt'); // Get the JWT token from local storage
        const refreshToken = localStorage.getItem('refreshToken');
        const expiresIn = localStorage.getItem('expiresIn');
        if (jwtToken && refreshToken && expiresIn) {
            setJwtResponse!({jwt: jwtToken, refreshToken, expiresIn: parseInt(expiresIn)} as IJWTResponse)
            decodedJwtData = jwt_decode(jwtToken) as IJwtPayload;
            id = decodedJwtData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        }
    }

    if (id && decodedJwtData) {
        console.log("Id CheckAndDecodeJWT: " + id);
        console.log("JwtData decoded CheckAndDecodeJWT: " + JSON.stringify(decodedJwtData));
        return { id, decodedJwtData };
    }

    // If JWT doesn't exist, return null values
    return { id: null, decodedJwtData: null };
}