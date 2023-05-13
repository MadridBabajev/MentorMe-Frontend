import {BaseEntityService} from "../base-services/BaseEntityService";
import {ITutorProfileData} from "../../types/dto/domain/ITutorProfileData";

export class TutorService extends BaseEntityService<ITutorProfileData> {
    constructor() {
        super("v1/profile/");
    }

}