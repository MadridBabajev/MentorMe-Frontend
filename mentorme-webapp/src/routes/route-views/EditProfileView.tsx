import {IEditProfileViewProps} from "../../types/props/profiles/IEditProfileViewProps";
import {ReactComponent as PencilIcon} from '../../assets/pencil-icon.svg';
import {FaCheck as TickIcon, FaTimes as CrossIcon} from 'react-icons/fa';
import {Button, Modal} from "react-bootstrap";
import {Patterns} from "../../types/strings/Patterns";
import React from "react";
import {IUpdatedProfileData} from "../../types/dto/domain/profiles/IUpdatedProfileData";
import {UserTypes} from "../../types/strings/UserTypes";
import unknownProfilePicture from "../../assets/unknown-profile.png";
import "../../styles/pages/edit-profile.css"

export const EditProfileView = (props: IEditProfileViewProps) => {
    const {isEditable, handleEdit, handleClose, handleConfirmSubmit, currentProfileData, show} = props;

    return (
        <div className="profile-container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update the profile data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="sidebar">
                <img className="profile-picture" src={(currentProfileData?.profilePicture && currentProfileData?.profilePicture !== '') ?
                    `${Patterns.DECODE_IMG}${currentProfileData?.profilePicture}` :
                    unknownProfilePicture}
                     alt="profile"/>
            </div>
            <div className="profile-details">
                <h1 className="mainH1 mb-3">Profile Details</h1>
                {isEditable ? (
                    <ProfileForm {...props} />
                ) : (
                    <ProfileDisplay currentProfileData={currentProfileData} handleEdit={handleEdit}/>
                )}
            </div>
        </div>
    );
};

export const ProfileForm = (props: IEditProfileViewProps) => {
    const {handleCancel, handleChange, handleSubmit, currentProfileData, updatedProfileData, validationErrors} = props;

    const renderHourlyRateInput = () => {
        if (currentProfileData?.userType === UserTypes.TUTOR) {
            return (
                <div>
                    <label className="greyH2">Hourly Rate: </label>
                    <div className="mb-2 slider-text">{updatedProfileData?.hourlyRate}</div>
                    <input
                        className="profile-details-input"
                        type="range"
                        name="hourlyRate"
                        min={10}
                        max={50}
                        step={2.5}
                        value={updatedProfileData?.hourlyRate || 10}
                        onChange={props.handleRateChange}/>
                </div>
            )
        }
    }

    return (
        <form style={{marginTop: "-10px"}} onSubmit={handleSubmit}>
            <div className="profile-details-actions">
                <TickIcon className="submit-icon" onClick={handleSubmit}/>
                <CrossIcon className="cancel-icon" onClick={handleCancel}/>
            </div>
            <div>
                <label className="greyH2">First Name: </label>
                <input
                    className="profile-details-input"
                    type="text"
                    name="firstName"
                    value={updatedProfileData?.firstName}
                    onChange={handleChange}/>
            </div>
            <div>
                <label className="greyH2">Last Name: </label>
                <input
                    className="profile-details-input"
                    type="text"
                    name="lastName"
                    value={updatedProfileData?.lastName}
                    onChange={handleChange}/>
            </div>
            <div>
                <label className="greyH2">Mobile Phone: </label>
                <input
                    className="profile-details-input"
                    type="text"
                    name="mobilePhone"
                    value={updatedProfileData?.mobilePhone}
                    onChange={handleChange}/>
            </div>
            <div>
                <label className="greyH2">Title: </label>
                <input
                    className="profile-details-input"
                    type="text"
                    name="title"
                    value={updatedProfileData?.title}
                    onChange={handleChange}/>
            </div>
            <div>
                <label className="greyH2">Bio: </label>
                <textarea
                    className="profile-details-input"
                    name="bio"
                    value={updatedProfileData?.bio}
                    onChange={handleChange}/>
            </div>
            <div className="profile-picture-div">
                <label htmlFor="profilePicture" className="upload-button">Upload Picture</label>
                <input
                    id="profilePicture"
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    style={{display: "none"}}
                />
            </div>
            {renderHourlyRateInput()}
            {validationErrors && validationErrors.length > 0 && (
                <ErrorMessage errors={validationErrors}/>
            )}
        </form>
    );
};

export const ProfileDisplay = ({currentProfileData, handleEdit}: {
    currentProfileData: IUpdatedProfileData | undefined,
    handleEdit: () => void
}) => {
    return (
        <>
            <div className="profile-details-actions edit-button" onClick={handleEdit}>
                <PencilIcon className="edit-icon"/>
            </div>
            <div className="d-flex flex-row">
                <label className="greyH2">First Name: </label>
                <div className="profile-details-text">{currentProfileData?.firstName}</div>
            </div>
            <div className="d-flex flex-row">
                <label className="greyH2">Last Name: </label>
                <div className="profile-details-text">{currentProfileData?.lastName}</div>
            </div>
            <div className="d-flex flex-row">
                <label className="greyH2">Mobile Phone: </label>
                <div className="profile-details-text">{currentProfileData?.mobilePhone}</div>
            </div>
            <div className="d-flex flex-row">
                <label className="greyH2">Title: </label>
                <div className="profile-details-text">{currentProfileData?.title}</div>
            </div>
            <div className="d-flex flex-row">
                <label className="greyH2">Bio: </label>
                <div className="profile-details-text">{currentProfileData?.bio}</div>
            </div>
            {currentProfileData?.userType === UserTypes.TUTOR && (
                <div className="d-flex flex-row">
                    <label className="greyH2">Hourly Rate: </label>
                    <div className="profile-details-text">{currentProfileData?.hourlyRate}</div>
                </div>
            )}
        </>
    );
};

const ErrorMessage = ({errors}: { errors: string[] }) => (
    <div className="error-message">
        {errors.map((error, i) => (
            <div key={i}>{error}</div>
        ))}
    </div>
)
