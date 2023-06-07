import {BaseEntityService} from "../base-services/BaseEntityService";
import {HostURLs} from "../../types/strings/HostURLs";
import {IUpdatedProfileData} from "../../types/dto/domain/profiles/IUpdatedProfileData";

export class EditProfileService extends BaseEntityService<IUpdatedProfileData> {
    constructor() {
        super(HostURLs.PROFILE_CONTROLLER);
    }

    async updateProfileData(updatedProfileData: IUpdatedProfileData) {
        try {
            return await this.axios.put(HostURLs.EDIT_PROFILE_DETAILS, updatedProfileData);
        } catch (error) {
            console.error(`Failed to edit the profile: ${error}`);
        }
    }
}
