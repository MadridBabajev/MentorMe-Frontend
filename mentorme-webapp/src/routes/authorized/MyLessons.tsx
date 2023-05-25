import React, {useEffect, useState} from "react";
import {ILessonListElement} from "../../types/dto/domain/lessons/ILessonListElement";
import {LessonsListService} from "../../services/app-services/LessonsListService";
import {MyLessonsListElement} from "../route-views/MyLessonsListElement";
import "../../styles/pages/lessons-list.css"
import {useNavigate} from "react-router-dom";

export const MyLessons = () => {
    const service = new LessonsListService();
    const [lessons, setLessons] = useState<ILessonListElement[] | undefined>();
    const fetchLessonsPath = "GetLessonsList";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await service.getAll(fetchLessonsPath);
            console.log("My lessons data: ", result)

            // Sort the lessons based on the start time, newest first
            result!.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

            setLessons(result);
        };

        fetchData().catch( () => {
            console.log("Failed to fetch lessons list")
        });
    }, []);

    const handleClick = (lessonId: string) => {
        // Navigate to the lesson page when the card is clicked
        navigate(`/lesson/${lessonId}`);
    }

    return (
        <div>
            <h1 className="mainH1 mb-5" style={{textAlign: "center", marginTop: "200px"}}>My lessons</h1>
            <div>
                {lessons?.map(lesson =>
                    <MyLessonsListElement lessonData={lesson}
                                          handleClick={handleClick}
                                          key={lesson.id} {...lesson} />)}
            </div>
        </div>
    )
}