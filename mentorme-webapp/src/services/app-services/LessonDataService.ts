import {BaseEntityService} from "../base-services/BaseEntityService";
import {ILesson} from "../../types/dto/domain/lessons/ILesson";
import {IRemoveTag} from "../../types/dto/domain/lessons/IRemoveTag";
import {INewTag} from "../../types/dto/domain/lessons/INewTag";
import {IUserReview} from "../../types/dto/domain/lessons/IUserReview";
import {ETutorDecision} from "../../types/dto/domain/enums/ETutorDecision";
import {HostURLs} from "../../types/strings/HostURLs";
import {Specifiers} from "../../types/strings/Specifiers";

export class LessonDataService extends BaseEntityService<ILesson> {
    constructor() {
        super(HostURLs.LESSONS_CONTROLLER);
    }

    async leaveReview(userReview: IUserReview) {
        try {
            return await this.axios.post(HostURLs.LEAVE_REVIEW, userReview);
        } catch (error) {
            console.error(`Failed to leave a review: ${error}`);
        }
    }

    async addTag(newTag: INewTag) {
        try {
            return await this.axios.post(HostURLs.ADD_TAG, newTag);
        } catch (error) {
            console.error(`Failed to add a tag: ${error}`);
        }
    }

    async removeTag(removeTag: IRemoveTag) {
        try {
            return await this.axios.delete(HostURLs.REMOVE_TAG + `${Specifiers.TAG}${removeTag.tagId}`);
        } catch (error) {
            console.error(`Failed to remove a tag: ${error}`);
        }
    }

    async cancelLesson(lessonId: string) {
        try {
            return await this.axios.put(`${HostURLs.CANCEL_LESSON}`,
                {lessonId: lessonId});
        } catch (error) {
            console.error(`Failed to cancel the lesson: ${error}`);
        }
    }

    async acceptDeclineLesson(lessonId: string, tutorDecision: ETutorDecision) {
        try {
            return await this.axios.put(HostURLs.ACCEPT_DECLINE_LESSON, {
                lessonId: lessonId,
                tutorDecision: tutorDecision });
        } catch (error) {
            console.error(`Failed to accept/decline the lesson: ${error}`);
        }
    }
}
