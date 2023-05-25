import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectListElement} from "../../types/dto/domain/subjects/ISubjectListElement";

export class SubjectsListService extends BaseEntityService<ISubjectListElement> {
    constructor() {
        super("v1/subjects/");
    }
}
