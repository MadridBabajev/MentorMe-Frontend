import React, {useMemo} from "react";
import {ProfileMainContent, ProfileSidebar} from "../route-views/ProfileViews";
import {StudentProfileService} from "../../services/app-services/StudentProfileService";
import {useProfileData} from "../../services/helpers/custom-hooks/UseProfileData";
import {Loader} from "../../components/layout/Loader";
import {IProfileProps} from "../../types/props/profiles/IProfileProps";
import {GetServicePaths} from "../../types/strings/GetServicePaths";

export const StudentProfile = (props: IProfileProps) => {

    const service = useMemo(() => new StudentProfileService(), []);
    const profileDetailsPath = GetServicePaths.STUDENT_DATA;

    const {profileData, loading} = useProfileData(service, profileDetailsPath, props.visitedUserId ?? null);

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