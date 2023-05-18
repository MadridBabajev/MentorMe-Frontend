import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "../route-views/ProfileViews";
import {TutorProfileService} from "../../services/app-services/TutorProfileService";
import {useProfileData} from "../../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../../components/layout/Loader";

interface ProfileProps {
    id: string;
    visitedUserId?: string;
}

export const TutorProfile = (props: ProfileProps) => {
    // fetch data using the tutor profile service instead of the profile service

    const service = useMemo(() => new TutorProfileService(), []);
    const profileDetailsPath = `GetTutorProfile`;

    const {profileData, loading} = useProfileData(service, profileDetailsPath, props.visitedUserId ?? null);

    if (loading) {
        return (
            <Loader />
        );
    }

    console.log(profileData)
    return (
        <div className="profile-container">
            <ProfileSidebar profileData={profileData} isPublic={profileData?.isPublic}/>
            <ProfileMainContent profileData={profileData} isPublic={profileData?.isPublic} id={props.id}/>
        </div>
    );
};