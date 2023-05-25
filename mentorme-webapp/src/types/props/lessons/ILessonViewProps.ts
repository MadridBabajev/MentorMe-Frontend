import {ILesson} from "../../dto/domain/lessons/ILesson";
import {ILessonPrivileges} from "./ILessonPrivileges";
import {IUserReview} from "../../dto/domain/lessons/IUserReview";
import {ETutorDecision} from "../../dto/domain/enums/ETutorDecision";
import {INewTag} from "../../dto/domain/lessons/INewTag";
import {EReviewType} from "../../dto/domain/enums/EReviewType";

export interface ILessonViewProps {
    lessonData: ILesson;
    privileges: ILessonPrivileges;
    handleTagRemoval: (tagId: string) => Promise<void>;
    handleAddReview: (userReview: IUserReview) => Promise<void>;
    handleCancellation: () => Promise<void>;
    handleLessonAccept: (tutorDecision: ETutorDecision) => Promise<void>;
    handleLessonDecline: (tutorDecision: ETutorDecision) => Promise<void>;
    handleTagAddition: (newTag: INewTag) => Promise<void>;
    showAddTagModal: boolean;
    showAddAddReviewModal: boolean
    setShowAddTagModal: (showTagModal: boolean) => void;
    setShowAddReviewModal: (showReviewModal: boolean) => void;
    reviewType: EReviewType
}