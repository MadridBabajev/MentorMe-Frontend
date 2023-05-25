import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectDetails} from "../../types/dto/domain/subjects/ISubjectDetails";

export class SubjectsDetailsService extends BaseEntityService<ISubjectDetails> {
    constructor() {
        super("v1/subjects/");
    }

}
