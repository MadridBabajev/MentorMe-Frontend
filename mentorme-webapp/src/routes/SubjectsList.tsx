import React, {useEffect, useMemo, useState} from "react";
import { Card } from 'react-bootstrap';
import { SubjectsListService } from "../services/app-services/SubjectsListService";
import { ISubjectListElement } from "../types/dto/domain/subjects/ISubjectListElement";
import "../styles/pages/subjects-list.css"
import {Link} from "react-router-dom";
import {Loader} from "../components/layout/Loader";
import {GetServicePaths} from "../types/strings/GetServicePaths";
import {Navigations} from "../types/strings/Navigations";
import {Patterns} from "../types/strings/Patterns";

const SubjectsList = () => {

    const [subjects, setSubjects] = useState<ISubjectListElement[]>([]);
    const [loading, setLoading] = useState(true);
    const service = useMemo(() => new SubjectsListService(), []);
    const allSubjectsPath = GetServicePaths.ALL_SUBJECTS;

    useEffect(() => {
        service.getAll(allSubjectsPath).then(
            response => {
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
                    <Link to={`${Navigations.SUBJECTS}/${subject.id}`}>
                        <Card.Img variant="top" src={`${Patterns.DECODE_IMG}${subject.subjectPicture}`} />
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