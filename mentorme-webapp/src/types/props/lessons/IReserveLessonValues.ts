export interface IReserveLessonValues {
    tutorId: string;
    lessonStartDate: Date | null;
    lessonEndDate: Date | null;
    selectedPaymentMethod: string | null;
    selectedSubject: string | null;
}