import { useEffect, useState } from "react";
import {BaseEntityService} from "../../base-services/BaseEntityService";
import {IStudentProfileData} from "../../../types/dto/domain/IStudentProfileData";
import {ITutorProfileData} from "../../../types/dto/domain/ITutorProfileData";

export const useProfileData = (service: BaseEntityService<IStudentProfileData | ITutorProfileData>, profileDetailsPath: string) => {
    const [profileData, setProfileData] = useState<IStudentProfileData | ITutorProfileData | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.findOneById(profileDetailsPath)
            .then(response => {
                console.log(response);
                // await timeout(3000);
                setProfileData(response as IStudentProfileData | ITutorProfileData | undefined);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [service, profileDetailsPath]);

    return { profileData, loading };
};

// function timeout(delay: number) {
//     return new Promise( res => setTimeout(res, delay) );
// }