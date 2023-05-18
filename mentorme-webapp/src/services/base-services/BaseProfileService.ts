import {BaseEntityService} from "./BaseEntityService";
import {IStudentProfileData} from "../../types/dto/domain/IStudentProfileData";
import {ITutorProfileData} from "../../types/dto/domain/ITutorProfileData";

export abstract class BaseProfileService extends BaseEntityService<IStudentProfileData | ITutorProfileData> {
    constructor() {
        super("v1/profile/");
    }

    async getUserProfile(path: string, visitedUserId: string | null): Promise<IStudentProfileData | ITutorProfileData | undefined> {
        try {
            const body = { visitedUserId }; // Create a request body with visitedUserId
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
