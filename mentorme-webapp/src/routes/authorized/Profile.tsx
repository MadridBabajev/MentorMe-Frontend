import React, {useContext, useEffect, useState} from "react";
import {StudentProfile} from "./StudentProfile";
import {TutorProfile} from "./TutorProfile";
import {useLocation, useNavigate} from "react-router-dom";
import {CheckAndDecodeJWT} from "../../services/helpers/CheckAndDecodeJWT";
import JwtContext from "../../types/context/JwtContext";
import {IJwtPayload} from "../../types/dto/identity/IJwtPayload";
import {Loader} from "../../components/layout/Loader";

// TODO: Seems like the component loads before the jwtResponse is set resulting in it being a null
// Find a better solution than simply passing the jwt data to through the login
const Profile = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const visitedUserId = location.state?.id;
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
            // When jwt token is decoded successfully, set loading to false
            setLoading(false);
        } catch (error) {
            console.error("Failed to decode JWT", error);
            localStorage.clear();
            // If JWT token or decoded data is not found, redirect to login page
            navigate('/login');
        }

    }, [navigate, jwtResponse, setJwtResponse, jwtData]);

    // Show the loader while loading
    if (loading) {
        return <Loader />;
    }

    // TODO: Make student profiles visible as guest too
    if(visitedUserId) {
        // If visitedUserId is present, show TutorProfile as a guest
        return <TutorProfile id={id!} userType={decodedJwtData?.UserType} visitedUserId={visitedUserId} />
    } else if(decodedJwtData?.UserType === 'Student') {
        // If no visitedUserId and user is a student, show StudentProfile
        return <StudentProfile userType={decodedJwtData?.UserType} id={id!} />
    } else if(decodedJwtData?.UserType === 'Tutor') {
        // If no visitedUserId and user is a tutor, show TutorProfile
        return <TutorProfile userType={decodedJwtData?.UserType} id={id!} />
    }


    return null;
}
export default Profile;