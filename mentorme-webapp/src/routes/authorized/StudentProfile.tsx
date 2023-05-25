import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "../route-views/ProfileViews";
import {StudentProfileService} from "../../services/app-services/StudentProfileService";
import {useProfileData} from "../../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../../components/layout/Loader";
import {IProfileProps} from "../../types/props/profiles/IProfileProps";

export const StudentProfile = (props: IProfileProps) => {
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

    return (
        <div className="profile-container">
            <ProfileSidebar profileData={profileData} userType={props.userType!} />
            <ProfileMainContent profileData={profileData} userType={props.userType!} id={props.id}/>
        </div>
    );
};