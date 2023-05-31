import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {LessonDataService} from "../../services/app-services/LessonDataService";
import LessonView from "../route-views/LessonView";
import {Loader} from "../../components/layout/Loader";
import {ILesson} from "../../types/dto/domain/lessons/ILesson";
import {ILessonPrivileges} from "../../types/props/lessons/ILessonPrivileges";
import {ETutorDecision} from "../../types/dto/domain/enums/ETutorDecision";
import {IUserReview} from "../../types/dto/domain/lessons/IUserReview";
import {INewTag} from "../../types/dto/domain/lessons/INewTag";
import {CheckAndDecodeJWT} from "../../services/helpers/CheckAndDecodeJWT";
import JwtContext from "../../types/context/JwtContext";
import {EReviewType} from "../../types/dto/domain/enums/EReviewType";
import {notificationManager} from "../../services/helpers/NotificationManager";
import {Notifications} from "../../types/strings/Notifications";
import {GetServicePaths} from "../../types/strings/GetServicePaths";
import {UserTypes} from "../../types/strings/UserTypes";

const Lesson = () => {
    const { lessonId } = useParams();
    const lessonService = useMemo(() => new LessonDataService(), []);
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const [lessonData, setLessonData] = useState<ILesson | undefined>(undefined);
    const [privileges, setPrivileges] = useState<ILessonPrivileges | undefined>(undefined);
    const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);
    const [userReview, setUserReview] = useState<IUserReview | undefined>(undefined);

    const getLessonDataPath = `${GetServicePaths.LESSON_DATA}/${lessonId}`;

    const fetchLessonData = useCallback( async () => {
        const response = await lessonService.findOneById(getLessonDataPath);
        if (response) {
            setLessonData(response);

            // Calculate privileges once lesson data is available
            const isUserTutor = response.viewedByTutor;
            setPrivileges({
                canCancel: response.lessonState === 1,
                canAcceptDecline: isUserTutor && response.lessonState === 0,
                canAddTag: isUserTutor && [1, 2].includes(response.lessonState),
                canReview: response.lessonState === 2 && response.userCanWriteReview,
            });
        }
    }, [lessonService, getLessonDataPath]);

    useEffect(() => {
        fetchLessonData().catch( () => {
            console.error("Failed to fetch lesson data")
        });
        const { decodedJwtData } =
            CheckAndDecodeJWT({ jwtResponse: jwtResponse, setJwtResponse})!;
        setUserReview({
            lessonId: lessonId!,
            reviewType: decodedJwtData?.UserType === UserTypes.STUDENT ?
                EReviewType.ReviewOfTutor : EReviewType.ReviewOfStudent,
            studentId: lessonData?.lessonStudent.id!,
            tutorId: lessonData?.lessonTutor.id!,
            comment: '',
            rating: 5
        })
    }, [lessonId, jwtResponse, setJwtResponse]);

    if (!lessonData || !privileges) {
        return <Loader />
    }

    const handleAddReview = async (userReview: IUserReview) => {
        await lessonService.leaveReview(userReview);
        await fetchLessonData();
        notificationManager.showSuccessNotification(Notifications.REVIEW_ADDED);
    }

    const handleTagRemoval = async (tagId: string) => {
        await lessonService.removeTag({ tagId: tagId });
        await fetchLessonData();
        notificationManager.showErrorNotification(Notifications.TAG_DELETED);
    };

    const handleTagAddition = async (newTag: INewTag) => {
        await lessonService.addTag(newTag);
        await fetchLessonData();
        notificationManager.showSuccessNotification(Notifications.TAG_ADDED);
    };

    const handleCancellation = async () => {
        await lessonService.cancelLesson(lessonId!);
        await fetchLessonData();
        notificationManager.showErrorNotification(Notifications.LESSON_CANCELLED);
    };

    const handleLessonAccept = async (tutorDecision: ETutorDecision) => {
        await lessonService.acceptDeclineLesson(lessonId!, tutorDecision);
        await fetchLessonData();
        notificationManager.showSuccessNotification(Notifications.LESSON_ACCEPTED);
    };

    const handleLessonDecline = async (tutorDecision: ETutorDecision) => {
        await lessonService.acceptDeclineLesson(lessonId!, tutorDecision);
        await fetchLessonData();
        notificationManager.showErrorNotification(Notifications.LESSON_DECLINED);
    };

    return (
        <div>
            <h2 className="mb-5 mainH1" style={{textAlign: "center", marginTop: "180px"}}>Lesson</h2>
            <LessonView
                handleTagRemoval={handleTagRemoval}
                handleAddReview={handleAddReview}
                handleCancellation={handleCancellation}
                handleLessonAccept={handleLessonAccept}
                handleLessonDecline={handleLessonDecline}
                handleTagAddition={handleTagAddition}
                privileges={privileges}
                lessonData={lessonData}
                showAddTagModal={showAddTagModal}
                showAddAddReviewModal={showAddReviewModal}
                setShowAddReviewModal={setShowAddReviewModal}
                setShowAddTagModal={setShowAddTagModal}
                reviewType={userReview?.reviewType!} />
        </div>
    );
};

export default Lesson;