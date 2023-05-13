import {BaseEntityService} from "../base-services/BaseEntityService";
import {IStudentProfileData} from "../../types/dto/domain/IStudentProfileData";

export class StudentService extends BaseEntityService<IStudentProfileData> {
    constructor() {
        super("v1/profile/");
    }

}