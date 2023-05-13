import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {ISubjectDetails} from "../types/dto/domain/ISubjectDetails";
import {SubjectsDetailsService} from "../services/app-services/SubjectDetailsService";
import "../styles/pages/subject-details.css";

const SubjectsDetails = () => {

    const { id } = useParams();

    const [subject, setSubject] = useState<ISubjectDetails>();
    const service = useMemo(() => new SubjectsDetailsService(), []);
    const subjectDetailsPath = `GetSubjectDetails/${id}`;

    useEffect(() => {
        service.findOneById(subjectDetailsPath).then(
            response => {
                console.log(response);
                setSubject(response || undefined);
            }
        );
    }, [service, subjectDetailsPath]);

    const imageSrc = useMemo(() => {
        if (subject?.subjectPicture) {
            return `data:image/jpeg;base64,${subject.subjectPicture}`;
        }
    }, [subject]);

    return (
        <div className="subject-details">
            <div className="subject-image">
                <img src={imageSrc} alt={subject?.name} />
                <div className="subject-info">
                    <div className="info-box">
                        <div className="number">{subject?.learnedBy}</div>
                        <div className="text">students learning</div>
                    </div>
                    <div className="info-box">
                        <div className="number">{subject?.taughtBy}</div>
                        <div className="text">tutors teaching</div>
                    </div>
                </div>
            </div>
            <h2 className="subject-title">{subject?.name}</h2>
            <p className="subject-description">{subject?.description}</p>
        </div>
    );
}
export default SubjectsDetails;