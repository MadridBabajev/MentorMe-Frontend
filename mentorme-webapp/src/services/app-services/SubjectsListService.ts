import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectListElement} from "../../types/dto/domain/subjects/ISubjectListElement";
import {HostURLs} from "../../types/strings/HostURLs";

export class SubjectsListService extends BaseEntityService<ISubjectListElement> {
    constructor() {
        super(HostURLs.SUBJECTS_CONTROLLER);
    }
}
