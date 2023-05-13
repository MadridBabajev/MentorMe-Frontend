import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectDetails} from "../../types/dto/domain/ISubjectDetails";

export class SubjectsDetailsService extends BaseEntityService<ISubjectDetails> {
    constructor() {
        super("v1/subjects/");
    }

}
