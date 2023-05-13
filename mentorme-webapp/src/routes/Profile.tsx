import React, { useContext } from "react";
import JwtContext from "../types/context/JwtContext";
import {StudentProfile} from "./StudentProfile";
import {TutorProfile} from "./TutorProfile";
import {useNavigate} from "react-router-dom";
import {checkAndDecodeJWT} from "../services/helpers/CheckAndDecodeJwt";

const Profile = () => {
    const navigate = useNavigate();
    const { jwtResponse } = useContext(JwtContext);
    const { id, decodedJwtData } = checkAndDecodeJWT(jwtResponse);

    // If JWT token or decoded data is not found, redirect to login page
    if (!id || !decodedJwtData) {
        navigate('/login');
        return null;
    }

    if(decodedJwtData.UserType === 'Student') {
        return <StudentProfile id={id} />
    }
    if(decodedJwtData.UserType === 'Tutor') {
        return <TutorProfile id={id} />
    }

    return null;
}
export default Profile;