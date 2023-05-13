import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "./route-views/ProfileViews";
import {TutorService} from "../services/app-services/TutorService";
import {useProfileData} from "../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../components/layout/Loader";

interface ProfileProps {
    id: string;
}

export const TutorProfile = ({id}: ProfileProps) => {
    // fetch data using the tutor profile service instead of the profile service

    const service = useMemo(() => new TutorService(), []);
    const profileDetailsPath = `GetTutorProfile/${id}`;

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