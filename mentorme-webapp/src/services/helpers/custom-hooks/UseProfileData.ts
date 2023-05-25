import { useEffect, useState } from "react";
import {IStudentProfileData} from "../../../types/dto/domain/profiles/IStudentProfileData";
import {ITutorProfileData} from "../../../types/dto/domain/profiles/ITutorProfileData";
import {BaseProfileService} from "../../base-services/BaseProfileService";

export const useProfileData = (service: BaseProfileService, profileDetailsPath: string, visitedUserId: string | null) => {
    const [profileData, setProfileData] = useState<IStudentProfileData | ITutorProfileData | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getUserProfile(profileDetailsPath, visitedUserId)
            .then(response => {
                // await timeout(3000);
                setProfileData(response as IStudentProfileData | ITutorProfileData | undefined);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [service, profileDetailsPath, visitedUserId]);

    return { profileData, loading };
};
