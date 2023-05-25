import React from "react";
import {Card} from "react-bootstrap";
import {ELessonState} from "../../types/dto/domain/enums/ELessonState";
import {MyLessonsViewProps} from "../../types/props/lessons/MyLessonsViewProps";

const lessonStateColorMap: Record<ELessonState, string> = {
    [ELessonState.Pending]: 'blue', // Pending
    [ELessonState.Upcoming]: 'lightgreen', // Upcoming
    [ELessonState.Finished]: 'green', // Finished
    [ELessonState.Canceled]: 'red'  // Cancelled
};

const lessonStateTextMap: Record<ELessonState, string> = {
    [ELessonState.Pending]: 'Pending',
    [ELessonState.Upcoming]: 'Upcoming',
    [ELessonState.Finished]: 'Finished',
    [ELessonState.Canceled]: 'Canceled'
};

export const MyLessonsListElement = (props: MyLessonsViewProps) => {

    const handleClick = () => {
        props.handleClick(props.lessonData.id!);
    }

    return (
        <Card className="mb-4" onClick={handleClick}>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div className="card-titles">
                        <Card.Title>Start Time: {new Date(props.lessonData.startTime).toLocaleString()}</Card.Title>
                        <Card.Title>End Time: {new Date(props.lessonData.endTime).toLocaleString()}</Card.Title>
                        <Card.Title>Price: {props.lessonData.lessonPrice}</Card.Title>
                    </div>
                    <div className="card-titles">
                        <Card.Title>Tutor: {props.lessonData.tutorFullName}</Card.Title>
                        <Card.Title>Student: {props.lessonData.studentFullName}</Card.Title>
                        <Card.Title>Subject: {props.lessonData.subjectName}</Card.Title>
                    </div>
                    <div className="d-flex align-items-center">
                        <strong>
                            <span style={{ color: lessonStateColorMap[props.lessonData.lessonState], fontSize: "18px", textAlign: "right", }}>
                                {lessonStateTextMap[props.lessonData.lessonState]}
                            </span>
                        </strong>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}