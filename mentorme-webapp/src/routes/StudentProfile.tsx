import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "./route-views/ProfileViews";
import {StudentService} from "../services/app-services/StudentService";
import {useProfileData} from "../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../components/layout/Loader";

interface ProfileProps {
    id: string;
}

export const StudentProfile = ({id}: ProfileProps) => {
    // fetch data using the tutor profile service instead of the profile service

    const service = useMemo(() => new StudentService(), []);
    const profileDetailsPath = `GetStudentProfile/${id}`;

    const {profileData, loading} = useProfileData(service, profileDetailsPath);

    if (loading) {
        return (
            <Loader />
        );
    }

    console.log(profileData)
    return (
        <div className="profile-container">
            <ProfileSidebar profileData={profileData} isPublic={profileData?.isPublic}/>
            <ProfileMainContent profileData={profileData} isPublic={profileData?.isPublic} id={id}/>
        </div>
    );
};