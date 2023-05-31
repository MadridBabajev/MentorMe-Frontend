import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ILessonListElement} from "../../types/dto/domain/lessons/ILessonListElement";
import {LessonsListService} from "../../services/app-services/LessonsListService";
import {MyLessonsListElement} from "../route-views/MyLessonsListElement";
import "../../styles/pages/lessons-list.css"
import {useNavigate} from "react-router-dom";
import {GetServicePaths} from "../../types/strings/GetServicePaths";
import {Navigations} from "../../types/strings/Navigations";

export const MyLessons = () => {
    const service = useMemo(() => new LessonsListService(), []);
    const [lessons, setLessons] = useState<ILessonListElement[] | undefined>();
    const fetchLessonsPath = GetServicePaths.LESSON_LIST;
    const navigate = useNavigate();

    const fetchData = useCallback( async () => {
        const result = await service.getAll(fetchLessonsPath);

        // Sort the lessons based on the start time, newest first
        result!.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

        setLessons(result);
    }, [service, fetchLessonsPath]);

    useEffect(() => {


        fetchData().catch( () => {
            console.error("Failed to fetch lessons list")
        });
    }, [fetchData]);

    const handleClick = (lessonId: string) => {
        navigate(`${Navigations.LESSON}/${lessonId}`);
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