import React, {useEffect, useMemo, useState} from "react";
import { Card } from 'react-bootstrap';
import { SubjectsListService } from "../services/app-services/SubjectsListService";
import { ISubjectListElement } from "../types/dto/domain/ISubjectListElement";
import "../styles/pages/subjects-list.css"
import {Link} from "react-router-dom";
import {Loader} from "../components/layout/Loader";

const SubjectsList = () => {
    // TODO: Implement adding removing subjects for tutors and students
    const [subjects, setSubjects] = useState<ISubjectListElement[]>([]);
    const [loading, setLoading] = useState(true);
    const service = useMemo(() => new SubjectsListService(), []);
    const allSubjectsPath = "GetAllSubjects";

    useEffect(() => {
        service.getAll(allSubjectsPath).then(
            response => {
                console.log(response);
                if (response){
                    setSubjects(response);
                } else {
                    setSubjects([]);
                }
                setLoading(false);
            }
        );
    }, [service, allSubjectsPath]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="d-flex flex-wrap justify-content-around">
            {subjects.map((subject) => (
                <Card className="subject-card" key={subject.id}>
                    <Link to={`/subjects/${subject.id}`}>
                        <Card.Img variant="top" src={`data:image/png;base64,${subject.subjectPicture}`} />
                        <Card.Body>
                            <Card.Title>{subject.name}</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
            ))}
        </div>
    );
}

export default SubjectsList;