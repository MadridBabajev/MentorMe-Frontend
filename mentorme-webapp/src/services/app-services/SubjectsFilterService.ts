import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectFilterElement} from "../../types/dto/domain/subjects/ISubjectFilterElement";
import {HostURLs} from "../../types/strings/HostURLs";

export class SubjectsFilterService extends BaseEntityService<ISubjectFilterElement> {
    constructor() {
        super(HostURLs.SUBJECTS_CONTROLLER);
    }
}