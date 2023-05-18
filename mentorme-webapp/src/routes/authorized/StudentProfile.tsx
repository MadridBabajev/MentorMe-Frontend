import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "../route-views/ProfileViews";
import {StudentProfileService} from "../../services/app-services/StudentProfileService";
import {useProfileData} from "../../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../../components/layout/Loader";

interface ProfileProps {
    id: string;
    visitedUserId?: string;
}

export const StudentProfile = (props: ProfileProps) => {
    // fetch data using the tutor profile service instead of the profile service

    const service = useMemo(() => new StudentProfileService(), []);
    const profileDetailsPath = `GetStudentProfile`;
    // TODO: implement visited user id like done in the tutor profile

    const {profileData, loading} = useProfileData(service, profileDetailsPath, null);

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