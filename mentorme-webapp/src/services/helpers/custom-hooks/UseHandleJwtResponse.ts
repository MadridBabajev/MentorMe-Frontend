import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IJWTResponse from "../../../types/dto/identity/IJWTResponse";
import {Navigations} from "../../../types/strings/Navigations";
import {LocalStorage} from "../../../types/strings/LocalStorage";

export const UseHandleJwtResponse = (jwtData: IJWTResponse | undefined) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtData) {
            localStorage.setItem(LocalStorage.JWT, jwtData.jwt);
            localStorage.setItem(LocalStorage.REFRESH_TOKEN, jwtData.refreshToken);

            const expiryTime = Date.now() + (jwtData.expiresIn * 1000);
            localStorage.setItem(LocalStorage.EXPIRY, String(expiryTime));

            // Navigate to profile page immediately after setting the JWT response
            navigate(Navigations.PROFILE, { state: {jwtData}});
        }
    }, [jwtData, navigate]);
};