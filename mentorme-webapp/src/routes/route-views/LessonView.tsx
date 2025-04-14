import {ILessonViewProps} from "../../types/props/lessons/ILessonViewProps";
import {Link, useNavigate} from "react-router-dom";
import {ISubjectListElement} from "../../types/dto/domain/subjects/ISubjectListElement";
import unknownProfilePicture from "../../assets/unknown-profile.png";
import {IProfileCardProps} from "../../types/props/profiles/IProfileCardProps";
import {Card} from "react-bootstrap";
import {ILesson} from "../../types/dto/domain/lessons/ILesson";
import React, {useState} from "react";
import {ELessonState} from "../../types/dto/domain/enums/ELessonState";
import {EPaymentMethodType} from "../../types/dto/domain/enums/EPaymentMethodType";
import {Button, Modal} from "react-bootstrap";
import {ITag} from "../../types/dto/domain/profiles/ITag";
import {ETutorDecision} from "../../types/dto/domain/enums/ETutorDecision";
import {TagAdditionFormProps} from "../../types/props/lessons/TagAdditionFormProps";
import {ReviewAdditionFormProps} from "../../types/props/lessons/ReviewAdditionFormProps";
import StarRating from "../../components/layout/StarRating";
import {Navigations} from "../../types/strings/Navigations";
import {Patterns} from "../../types/strings/Patterns";
import "../../styles/pages/lesson.css"

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

const paymentMethodTextMap: Record<EPaymentMethodType, string> = {
    [EPaymentMethodType.InApp]: 'In App',
    [EPaymentMethodType.Cash]: 'Cash',
    [EPaymentMethodType.Other]: 'Other'
};

const LessonView = (props: ILessonViewProps) => {

    const handleAddReviewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.setShowAddReviewModal(true);
    };

    const handleLessonAcceptClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.handleLessonAccept(ETutorDecision.Accept)
            .catch( () => {
                console.error("Error accepting the lesson")
            });
    };

    const handleLessonDeclineClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.handleLessonDecline(ETutorDecision.Decline).catch( () => {
            console.error("Error declining the lesson")
        });
    };

    const handleTagAdditionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.setShowAddTagModal(true);
    };

    const handleCloseAddTagModal = () => props.setShowAddTagModal(false);

    const handleCloseAddReviewModal = () => props.setShowAddReviewModal(false);

    return (

        <div className="lesson">
            {/* Modals */}
            <Modal show={props.showAddTagModal} onHide={handleCloseAddTagModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TagAdditionForm
                        handleCloseAddTagModal={handleCloseAddTagModal}
                        handleTagAddition={props.handleTagAddition}
                        lessonId={props.lessonData.id!} />
                </Modal.Body>
            </Modal>
            <Modal show={props.showAddAddReviewModal} onHide={handleCloseAddReviewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReviewAdditionForm
                        handleCloseAddReviewModal={handleCloseAddReviewModal}
                        handleAddReview={props.handleAddReview}
                        lessonId={props.lessonData.id!}
                        tutorId={props.lessonData.lessonTutor.id!}
                        studentId={props.lessonData.lessonStudent.id!}
                        reviewType={props.reviewType!} />
                </Modal.Body>
            </Modal>

            <div className="left-sidebar">
                <LessonSidebar lessonData={props.lessonData} />
            </div>
            <div className="main-content">
                <div className="profile-cards-row">
                    <ProfileCard profile={props.lessonData.lessonTutor} label="Tutor" />
                    <ProfileCard profile={props.lessonData.lessonStudent} label="Student" />
                    <SubjectCard id={props.lessonData.subject.id}
                                 name={props.lessonData.subject.name}
                                 subjectPicture={props.lessonData.subject.subjectPicture}/>
                </div>
                <div className="mt-3 main-content-actions">
                    <button
                        className={`action-button sub-action btn btn-primary ${!props.privileges.canReview && 'disabled'} btn-grey-outline`}
                        onClick={handleAddReviewClick}>
                        <span className="action-button-text">Leave Review</span>
                    </button>
                    <Link className="action-button sub-action btn btn-primary payments-btn" to={`${Navigations.PAYMENT}/${props.lessonData.paymentId}`}>
                        <span className="action-button-text">View Payment</span></Link>
                </div>
                <div className="mt-5">
                    <h3 style={{textAlign: "center", fontWeight: "500", fontSize: "30px"}} className="mb-3 greyH2">Tags</h3>
                    <div className="tag-actions-row tags-list">
                        {props.lessonData.tags
                            .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
                            .map(tag => (
                                <TagCard tag={tag} onRemove={props.handleTagRemoval} key={tag.id} canAddTag={props.privileges.canAddTag}/>
                            ))}
                    </div>
                </div>

            </div>
            <div className="actions">
                <div style={{textAlign: "center", fontWeight: "500", fontSize: "30px", marginTop: "15px"}}
                     className="mb-4 greyH2">Actions</div>
                <button className={`action-button btn btn-danger ${!props.privileges.canCancel && 'disabled'}`} onClick={props.handleCancellation}><span className="action-button-text">Cancel</span></button>
                {props.privileges.canAcceptDecline && <>
                    <button className="action-button btn btn-primary" onClick={handleLessonAcceptClick}><span className="action-button-text">Accept</span></button>
                    <button className="action-button btn btn-danger" onClick={handleLessonDeclineClick}><span className="action-button-text">Decline</span></button></>
                }
                {props.privileges.canAddTag &&
                    <button className={`action-button btn btn-secondary ${!props.privileges.canAddTag && 'disabled'}`}
                            onClick={handleTagAdditionClick}><span className="action-button-text">+ Tag</span></button>}
            </div>
        </div>
    );
};

const LessonSidebar = ({ lessonData }: { lessonData: ILesson }) => {

    return (
        <div className="left-sidebar">
            <h3 style={{textAlign: "center", fontWeight: "500", fontSize: "30px"}}
                className="mb-3 greyH2">Details</h3>
            <div className="simple-text">Start date: {new Date(lessonData.startTime).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
            <div className="simple-text">End date: {new Date(lessonData.endTime).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
            <div className="simple-text">Price: {lessonData.price}</div>
            <div className="simple-text">Payment method: {lessonData.studentPaymentMethod
                ? paymentMethodTextMap[lessonData.studentPaymentMethod.paymentMethodType] : 'N/A'}
            </div>
            <div className="simple-text">
                <strong>State: <span style={{ color: lessonStateColorMap[lessonData.lessonState]}}>{lessonStateTextMap[lessonData.lessonState]}</span></strong></div>
        </div>
    );
};

const SubjectCard = ({id, name, subjectPicture}: ISubjectListElement) => {
    return (
        <Card className="subject-card mb-3" key={id} style={{ height: '300px' }}>
            <Link to={`${Navigations.SUBJECTS}/${id}`}>
                <Card.Img className="card-image" variant="top" src={subjectPicture ? `${Patterns.DECODE_IMG}${subjectPicture}` : ''} />
                <Card.Body>
                    <Card.Title className="greyH2 subject-card-title">{name}</Card.Title>
                </Card.Body>
            </Link>
        </Card>
    );
};

const ProfileCard = ({ profile, label }: IProfileCardProps) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(Navigations.PROFILE, { state: { id: profile.id, visitedUserType: label} });
    };

    return (
        <Card className="profile-card mb-3" onClick={handleCardClick} style={{ height: '300px' }}>
            <Card.Img className="card-image" variant="top"
                      src={!profile.profilePicture ? unknownProfilePicture : `${Patterns.DECODE_IMG}${profile.profilePicture}`} />
            <Card.Body>
                <Card.Title className="greyH2">{profile.fullName}</Card.Title>
                <Card.Text className="simple-text">{label}</Card.Text>
            </Card.Body>
        </Card>
    );
};

const TagCard = ({ tag, onRemove, canAddTag }: { tag: ITag, onRemove: (tagId: string) => void, canAddTag: boolean }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => canAddTag && setShow(true);

    const handleRemove = () => {
        handleClose();
        onRemove(tag.id!);
    };

    return (
        <div className="tag-card rounded bg-white">
            <div className="tag-card-header d-flex justify-content-between">
                <h4 className="tag-card-name">{tag.name}</h4>
                {canAddTag && <button className="cross-button tag-remove-button" onClick={handleShow}>×</button>}
            </div>
            <p className="addedAt text-grey italic">{new Date(tag.addedAt).toLocaleString()}</p>
            <p className="tag-card-description simple-text">{tag.description}</p>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm tag removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this tag?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const TagAdditionForm = (props: TagAdditionFormProps) => {
    const [newTagName, setNewTagName] = useState('');
    const [newTagDescription, setNewTagDescription] = useState('');

    const handleAddTag = (event: React.FormEvent) => {
        event.preventDefault();
        props.handleTagAddition({ lessonId: props.lessonId, name: newTagName, description: newTagDescription });
        props.handleCloseAddTagModal();
    };

    return (
        <form className="tag-addition-form" onSubmit={handleAddTag}>
            <input className="tag-addition-input" type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Tag name" required />
            <textarea className="tag-addition-textarea" value={newTagDescription} onChange={(e) => setNewTagDescription(e.target.value)} placeholder="Tag description" required />
            <button className="btn btn-primary tag-addition-button" type="submit">Add Tag</button>
        </form>
    );
};

const ReviewAdditionForm = (props: ReviewAdditionFormProps) => {
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(5);

    const handleAddReview = (event: React.FormEvent) => {
        event.preventDefault();
        props.handleAddReview({
            lessonId: props.lessonId,
            tutorId: props.tutorId,
            studentId: props.studentId,
            reviewType: props.reviewType,
            rating: reviewRating,
            comment: reviewComment
        }).catch(() => {console.error("Error handling a review")});

        props.handleCloseAddReviewModal();
    };

    return (
        <form className="review-addition-form" onSubmit={handleAddReview}>
            <StarRating rating={reviewRating} setReviewRating={setReviewRating} />
            <textarea className="mt-2 review-addition-textarea" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Review comment" required />
            <button className="btn btn-primary review-addition-button" type="submit">Add Review</button>
        </form>
    );
};

export default LessonView;