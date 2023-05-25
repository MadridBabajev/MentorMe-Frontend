import {BaseEntityService} from "../base-services/BaseEntityService";
import {ILesson} from "../../types/dto/domain/lessons/ILesson";
import {IRemoveTag} from "../../types/dto/domain/lessons/IRemoveTag";
import {INewTag} from "../../types/dto/domain/lessons/INewTag";
import {IUserReview} from "../../types/dto/domain/lessons/IUserReview";
import {ETutorDecision} from "../../types/dto/domain/enums/ETutorDecision";

export class LessonDataService extends BaseEntityService<ILesson> {
    constructor() {
        super("v1/lessons/");
    }

    async leaveReview(userReview: IUserReview) {
        try {
            return await this.axios.post('LeaveReview', userReview);
        } catch (error) {
            console.error(`Failed to leave a review: ${error}`);
            throw error;
        }
    }

    async addTag(newTag: INewTag) {
        try {
            return await this.axios.post('AddTag', newTag);
        } catch (error) {
            console.error(`Failed to add a tag: ${error}`);
            throw error;
        }
    }

    async removeTag(removeTag: IRemoveTag) {
        try {
            return await this.axios.post('RemoveTag', removeTag);
        } catch (error) {
            console.error(`Failed to remove a tag: ${error}`);
            throw error;
        }
    }

    async cancelLesson(lessonId: string) {
        try {
            return await this.axios.post(`CancelLesson/${lessonId}`);
        } catch (error) {
            console.error(`Failed to cancel the lesson: ${error}`);
            throw error;
        }
    }

    async acceptDeclineLesson(lessonId: string, tutorDecision: ETutorDecision) {
        try {
            return await this.axios.post(`AcceptDeclineLesson`, { lessonId: lessonId, tutorDecision: tutorDecision });
        } catch (error) {
            console.error(`Failed to accept/decline the lesson: ${error}`);
            throw error;
        }
    }
}
