import {IReserveLessonData} from "../../types/props/lessons/IReserveLessonData";
import {BaseService} from "../base-services/BaseService";
import {IReserveLessonValues} from "../../types/props/lessons/IReserveLessonValues";
import {IReserveLessonResponse} from "../../types/dto/domain/profiles/IReserveLessonResponse";
import {HostURLs} from "../../types/strings/HostURLs";

export class ReserveLessonService extends BaseService {
    constructor() {
        super(HostURLs.LESSONS_CONTROLLER);
    }

    async getReserveLessonData(tutorId: string): Promise<IReserveLessonData | null> {
        try {
            const response = await this.axios.post<IReserveLessonData>(
                HostURLs.GET_RESERVE_LESSON_DATA,
                { visitedUserId: tutorId }
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching reserve lesson data:" + error);
            return null;
        }
    }

    async reserveLesson(values: IReserveLessonValues): Promise<IReserveLessonResponse | null> {
        try {
            const response =
                await this.axios.post<IReserveLessonResponse>(HostURLs.RESERVE_LESSON, {
                    tutorId: values.tutorId,
                    paymentMethodId: values.selectedPaymentMethod,
                    subjectId: values.selectedSubject,
                    lessonStartTime: values.lessonStartDate,
                    lessonEndTime: values.lessonEndDate,
                });
            return response.data;
        } catch (error) {
            console.error("Error creating the lesson:" + error);
            return null;
        }
    }
}