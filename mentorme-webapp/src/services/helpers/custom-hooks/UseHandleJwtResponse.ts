import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IJWTResponse from "../../../types/dto/identity/IJWTResponse";

export const UseHandleJwtResponse = (jwtData: IJWTResponse | undefined) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtData) {
            localStorage.setItem('jwt', jwtData.jwt);
            localStorage.setItem('refreshToken', jwtData.refreshToken);

            const expiryTime = Date.now() + (jwtData.expiresIn * 1000);
            localStorage.setItem('jwtExpiry', String(expiryTime));

            // Navigate to profile page immediately after setting the JWT response
            navigate('/profile', { state: {jwtData}});
        }
    }, [jwtData, navigate]); // values is added to the dependencies list
};