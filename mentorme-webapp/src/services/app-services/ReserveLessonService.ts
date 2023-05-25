import {IReserveLessonData} from "../../types/props/lessons/IReserveLessonData";
import {BaseService} from "../base-services/BaseService";
import {IReserveLessonValues} from "../../types/props/lessons/IReserveLessonValues";
import {IReserveLessonResponse} from "../../types/dto/domain/profiles/IReserveLessonResponse";
import {ILesson} from "../../types/dto/domain/lessons/ILesson";

export class ReserveLessonService extends BaseService {
    constructor() {
        super("v1/lessons/");
    }

    // async getLessonData(): Promise<ILesson | null> {
    //     try {
    //         const response = await this.axios.get<ILesson>(
    //             "GetLessonData"
    //         );
    //         console.log(response)
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching lesson data:", error);
    //         return null;
    //     }
    // }

    async getReserveLessonData(tutorId: string): Promise<IReserveLessonData | null> {
        try {
            const response = await this.axios.post<IReserveLessonData>(
                "GetReserveLessonData",
                { visitedUserId: tutorId }
            );
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error fetching reserve lesson data:", error);
            return null;
        }
    }

    async reserveLesson(values: IReserveLessonValues): Promise<IReserveLessonResponse | null> {
        try {
            const response =
                await this.axios.post<IReserveLessonResponse>("ReserveLesson", {
                tutorId: values.tutorId,
                paymentMethodId: values.selectedPaymentMethod,
                subjectId: values.selectedSubject,
                lessonStartTime: values.lessonStartDate,
                lessonEndTime: values.lessonEndDate,
            });
            return response.data;
        } catch (error) {
            console.error("Error creating the lesson:", error);
            return null;
        }
    }
}