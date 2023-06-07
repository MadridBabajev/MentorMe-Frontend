import {BaseEntityService} from "./BaseEntityService";
import {IStudentProfileData} from "../../types/dto/domain/profiles/IStudentProfileData";
import {ITutorProfileData} from "../../types/dto/domain/profiles/ITutorProfileData";
import {HostURLs} from "../../types/strings/HostURLs";
import {Specifiers} from "../../types/strings/Specifiers";

export abstract class BaseProfileService extends BaseEntityService<IStudentProfileData | ITutorProfileData> {
    constructor() {
        super(HostURLs.PROFILE_CONTROLLER);
    }

    async getUserProfile(path: string, visitedUserId: string | null): Promise<IStudentProfileData | ITutorProfileData | undefined> {
        try {
            let url = path;
            if (visitedUserId) {
                url += `${Specifiers.VISITED_USER}${visitedUserId}`;
            }
            const response = await this.axios.get<IStudentProfileData | ITutorProfileData>(url);
            if (response.status === 200) {
                return response.data as IStudentProfileData | ITutorProfileData;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
}
