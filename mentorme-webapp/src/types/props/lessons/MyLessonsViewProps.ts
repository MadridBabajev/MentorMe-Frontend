import {ILessonListElement} from "../../dto/domain/lessons/ILessonListElement";

export interface MyLessonsViewProps {
    lessonData: ILessonListElement;
    handleClick: (lessonId: string) => void;
}