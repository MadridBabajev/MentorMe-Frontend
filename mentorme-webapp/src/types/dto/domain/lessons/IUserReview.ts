import {EReviewType} from "../enums/EReviewType";

export interface IUserReview {
    lessonId: string;
    tutorId: string;
    studentId: string;
    reviewType: EReviewType | undefined;
    rating: number;
    comment: string;
}