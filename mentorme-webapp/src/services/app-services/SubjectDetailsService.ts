import {BaseEntityService} from "../base-services/BaseEntityService";
import {ISubjectDetails} from "../../types/dto/domain/subjects/ISubjectDetails";
import {IUserSubjectAction} from "../../types/dto/domain/subjects/IUserSubjectAction";
import {HostURLs} from "../../types/strings/HostURLs";

export class SubjectsDetailsService extends BaseEntityService<ISubjectDetails> {
    constructor() {
        super(HostURLs.SUBJECTS_CONTROLLER);
    }

    async handleSubjectAction(userSubjectAction: IUserSubjectAction) {
        try {
            return await this.axios.put(HostURLs.SUBJECT_ACTION, {
                subjectId: userSubjectAction.subjectId,
                subjectAction: userSubjectAction.subjectAction });
        } catch (error) {
            console.error(`Failed to add/remove the subject: ${error}`);
        }
    }
}
