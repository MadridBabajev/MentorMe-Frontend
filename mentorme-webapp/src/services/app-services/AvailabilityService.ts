import {BaseEntityService} from "../base-services/BaseEntityService";
import {IAvailability} from "../../types/dto/domain/profiles/IAvailability";
import {INewAvailability} from "../../types/dto/domain/profiles/INewAvailability";
import {HostURLs} from "../../types/strings/HostURLs";
import {Specifiers} from "../../types/strings/Specifiers";

export class AvailabilityService extends BaseEntityService<IAvailability> {
    constructor() {
        super(HostURLs.AVAILABILITY_CONTROLLER);
    }

    async deleteAvailability(availabilityId: string) {
        try {
            return await this.axios.delete(HostURLs.REMOVE_AVAILABILITY + `${Specifiers.AVAILABILITY}${availabilityId}`);
        } catch (error) {
            console.error(`Failed to remove an availability: ${error}`);
        }
    }

    async addAvailability(initialAvailability: INewAvailability) {
        try {
            return await this.axios.post(HostURLs.ADD_AVAILABILITY, initialAvailability);
        } catch (error) {
            console.error(`Failed to add a new availability: ${error}`);
        }
    }
}