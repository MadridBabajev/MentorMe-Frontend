import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectFilterElement} from "../../types/dto/domain/ISubjectFilterElement";

export class SubjectsFilterService extends BaseEntityService<ISubjectFilterElement> {
    constructor() {
        super("v1/subjects/");
    }
}