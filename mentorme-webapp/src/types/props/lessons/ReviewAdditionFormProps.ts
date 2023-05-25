import {IUserReview} from "../../dto/domain/lessons/IUserReview";
import {EReviewType} from "../../dto/domain/enums/EReviewType";

export interface ReviewAdditionFormProps {
    lessonId: string;
    tutorId: string;
    studentId: string;
    reviewType: EReviewType;
    handleAddReview: (review: IUserReview) => Promise<void>;
    handleCloseAddReviewModal: () => void;
}