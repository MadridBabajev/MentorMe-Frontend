import React, {useContext, useEffect, useState} from 'react';
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

const Lesson = () => {
    const { lessonId } = useParams();
    const lessonService = new LessonDataService();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const [lessonData, setLessonData] = useState<ILesson | undefined>(undefined);
    const [privileges, setPrivileges] = useState<ILessonPrivileges | undefined>(undefined);
    const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);
    const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);
    const [userReview, setUserReview] = useState<IUserReview | undefined>(undefined);

    const getLessonDataPath = `GetLessonData/${lessonId}`;

    const fetchLessonData = async () => {
        const response = await lessonService.findOneById(getLessonDataPath);
        if (response) {
            console.log("Fetched lesson data:", response)
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
    };

    useEffect(() => {
        fetchLessonData().catch( () => {
            console.log("Failed to fetch lesson data")
        });
        const { decodedJwtData: decodedJwtData } =
            CheckAndDecodeJWT({ jwtResponse: jwtResponse, setJwtResponse})!;
        setUserReview({
            lessonId: lessonId!,
            reviewType: decodedJwtData?.UserType === 'Student' ?
                EReviewType.ReviewOfTutor : EReviewType.ReviewOfStudent,
            studentId: lessonData?.lessonStudent.id!,
            tutorId: lessonData?.lessonTutor.id!,
            comment: '',
            rating: 5
        })
    }, [lessonId]);

    if (!lessonData || !privileges) {
        return <Loader />
    }

    const handleAddReview = async (userReview: IUserReview) => {
        console.log("adding review: " + userReview);
        try {
            const response = await
                lessonService.leaveReview(userReview);
            console.log("Tag Removal Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to remove tag: ${error}`);
        }
    }

    const handleTagRemoval = async (tagId: string) => {
        console.log("removing the tag: " + tagId);
        try {
            const response = await lessonService.removeTag({ tagId: tagId });
            console.log("Tag Removal Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to remove tag: ${error}`);
        }
    };

    const handleTagAddition = async (newTag: INewTag) => {
        console.log("adding a tag");
        try {
            const response = await lessonService.addTag(newTag);
            console.log("Tag Addition Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to add tag: ${error}`);
        }
    };

    const handleCancellation = async () => {
        console.log("cancelling the lesson");
        try {
            const response = await lessonService.cancelLesson(lessonId!);
            console.log("Cancellation Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to cancel lesson: ${error}`);
        }
    };

    const handleLessonAccept = async (tutorDecision: ETutorDecision) => {
        console.log("accepting the lesson");
        try {
            const response = await lessonService.acceptDeclineLesson(lessonId!, tutorDecision);
            console.log("Lesson Acceptance Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to accept lesson: ${error}`);
        }
    };

    const handleLessonDecline = async (tutorDecision: ETutorDecision) => {
        console.log("declining the lesson");
        try {
            const response = await lessonService.acceptDeclineLesson(lessonId!, tutorDecision);
            console.log("Lesson Declination Response:", response);
            await fetchLessonData();
        } catch (error) {
            console.error(`Failed to decline lesson: ${error}`);
        }
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