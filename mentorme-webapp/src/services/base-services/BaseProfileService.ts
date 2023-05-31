import {BaseEntityService} from "./BaseEntityService";
import {IStudentProfileData} from "../../types/dto/domain/profiles/IStudentProfileData";
import {ITutorProfileData} from "../../types/dto/domain/profiles/ITutorProfileData";
import {HostURLs} from "../../types/strings/HostURLs";

export abstract class BaseProfileService extends BaseEntityService<IStudentProfileData | ITutorProfileData> {
    constructor() {
        super(HostURLs.PROFILE_CONTROLLER);
    }

    async getUserProfile(path: string, visitedUserId: string | null): Promise<IStudentProfileData | ITutorProfileData | undefined> {
        try {
            const body = { visitedUserId };
            const response = await this.axios.post<IStudentProfileData | ITutorProfileData>(path, body);
            if (response.status === 200) {
                return response.data as IStudentProfileData | ITutorProfileData;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
}
