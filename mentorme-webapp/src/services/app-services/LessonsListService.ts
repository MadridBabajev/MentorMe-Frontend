import {BaseEntityService} from "../base-services/BaseEntityService";
import {ILessonListElement} from "../../types/dto/domain/lessons/ILessonListElement";

export class LessonsListService extends BaseEntityService<ILessonListElement> {
    constructor() {
        super("v1/lessons/");
    }

}
