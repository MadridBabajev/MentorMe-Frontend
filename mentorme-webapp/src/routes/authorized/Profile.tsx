import React, {useContext, useEffect, useState} from "react";
import {StudentProfile} from "./StudentProfile";
import {TutorProfile} from "./TutorProfile";
import {useLocation, useNavigate} from "react-router-dom";
import {CheckAndDecodeJWT} from "../../services/helpers/CheckAndDecodeJWT";
import JwtContext from "../../types/context/JwtContext";
import {IJwtPayload} from "../../types/dto/identity/IJwtPayload";
import {Loader} from "../../components/layout/Loader";
import {Navigations} from "../../types/strings/Navigations";
import {UserTypes} from "../../types/strings/UserTypes";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const visitedUserId = location.state?.id;
    const visitedUserType = location.state?.visitedUserType;
    const jwtData = location.state?.jwtData;
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const [id, setId] = useState<string | null>(null);
    const [decodedJwtData, setDecodedJwtData] = useState<IJwtPayload | null>(null);

    useEffect(() => {
        if (!jwtResponse && jwtData) {
            setJwtResponse!(jwtData);
        }

        try {
            const { id: authorizedUserId, decodedJwtData: authorizedUserDecodedJwtData } =
                CheckAndDecodeJWT({ jwtResponse: jwtResponse || jwtData, setJwtResponse})!;
            setId(authorizedUserId);
            setDecodedJwtData(authorizedUserDecodedJwtData);

            setLoading(false);
        } catch (error) {
            console.error(`Failed to decode JWT: ${error}`);
            localStorage.clear();
            // If JWT token or decoded data is not found, redirect to login page
            navigate(Navigations.LOGIN);
        }

    }, [navigate, jwtResponse, setJwtResponse, jwtData]);

    if (loading) {
        return <Loader />;
    }

    // Visited user profiles
    if (visitedUserType === UserTypes.STUDENT) {
        return <StudentProfile userType={decodedJwtData?.UserType} visitedUserId={visitedUserId} id={id!} />
    } else if (visitedUserType === UserTypes.TUTOR) {
        return <TutorProfile userType={decodedJwtData?.UserType} visitedUserId={visitedUserId} id={id!} />
    }

    // Private user profiles
    if (decodedJwtData?.UserType === UserTypes.STUDENT) {
        return <StudentProfile userType={decodedJwtData?.UserType} visitedUserId={visitedUserId} id={id!} />
    } else if(decodedJwtData?.UserType === UserTypes.TUTOR) {
        return <TutorProfile userType={decodedJwtData?.UserType} visitedUserId={visitedUserId} id={id!} />
    }

    return null;
}
export default Profile;