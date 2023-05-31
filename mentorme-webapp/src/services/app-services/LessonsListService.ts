import {BaseEntityService} from "../base-services/BaseEntityService";
import {ILessonListElement} from "../../types/dto/domain/lessons/ILessonListElement";
import {HostURLs} from "../../types/strings/HostURLs";

export class LessonsListService extends BaseEntityService<ILessonListElement> {
    constructor() {
        super(HostURLs.LESSONS_CONTROLLER);
    }

}
