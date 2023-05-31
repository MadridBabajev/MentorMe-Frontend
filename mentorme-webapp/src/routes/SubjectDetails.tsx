import {useParams} from "react-router-dom";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ISubjectDetails} from "../types/dto/domain/subjects/ISubjectDetails";
import {SubjectsDetailsService} from "../services/app-services/SubjectDetailsService";
import "../styles/pages/subject-details.css";
import {ESubjectAction} from "../types/dto/domain/enums/ESubjectAction";
import {Loader} from "../components/layout/Loader";
import {notificationManager} from "../services/helpers/NotificationManager";
import {Notifications} from "../types/strings/Notifications";
import {SubjectsDetailsView} from "./route-views/SubjectsDetailsView";
import {GetServicePaths} from "../types/strings/GetServicePaths";
import {Patterns} from "../types/strings/Patterns";

const SubjectsDetails = () => {
    const { id } = useParams();

    const [subject, setSubject] = useState<ISubjectDetails>();
    const service = useMemo(() => new SubjectsDetailsService(), []);
    const subjectDetailsPath = `${GetServicePaths.SUBJECT_DETAILS}/${id}`;

    const fetchData = useCallback(async () => {
        service.findOneById(subjectDetailsPath).then(
            response => {
                setSubject(response || undefined);
            }
        );
    }, [service, subjectDetailsPath]);

    const handleSubjectAddRemove = async () => {
        const action = subject?.isAdded ? ESubjectAction.RemoveSubject : ESubjectAction.AddSubject;
        await service.handleSubjectAction({
            subjectId: id!,
            subjectAction: action
        });

        subject?.isAdded ? notificationManager.showErrorNotification(Notifications.SUBJECT_REMOVED)
            :  notificationManager.showSuccessNotification(Notifications.SUBJECT_ADDED);

        await fetchData();
    };

    useEffect(() => {
        fetchData().catch(() => {
            console.error("Error occurred when fetching the subject data")
        });
    }, [fetchData]);

    const imageSrc = useMemo(() => {
        if (subject?.subjectPicture) {
            return `${Patterns.DECODE_IMG}${subject.subjectPicture}`;
        }
    }, [subject]);

    if (!subject) {
        return <Loader />
    }

    return (
        <SubjectsDetailsView handleSubjectAddRemove={handleSubjectAddRemove}
                             subject={subject}
                             imageSrc={imageSrc} />
    )
}

export default SubjectsDetails;
