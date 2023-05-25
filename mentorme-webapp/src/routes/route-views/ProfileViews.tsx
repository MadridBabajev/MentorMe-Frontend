import React from "react";
import { Card, Image } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ISubjectListElement} from "../../types/dto/domain/subjects/ISubjectListElement";
import "../../styles/pages/profile.css";
import defaultImage from "../../assets/unknown-profile.png";
import {ReactComponent as PencilIcon} from '../../assets/pencil-icon.svg';
import {IProfileViewProps} from "../../types/props/profiles/IProfileViewProps";
import {EDayOfTheWeek} from "../../types/dto/domain/enums/EDayOfTheWeek";

const getProfileBalanceColor = (balance: number | undefined): string =>
        balance && balance >= 0 ? 'green' : 'red';

export const ProfileSidebar = ({ profileData }: IProfileViewProps) => (
    <div className="sidebar">
        <Image
            className="profile-picture"
            src={profileData?.profilePicture ? `data:image/png;base64,${profileData.profilePicture}` : defaultImage}
        />
        <div className="greyH2 name-rating d-flex justify-content-center align-items-center">
            <div>{profileData?.firstName} {profileData?.lastName}</div>
            <div className="rating m-lg-2">
                <span className="star-icon">⭐</span>
                <span>{profileData?.averageRating}</span>
            </div>
        </div>
        {!profileData?.isPublic && (
            <div className="mt-5 simple-text d-flex justify-content-center flex-column">
                <h2 className="greyH2">Current balance</h2>
                <div className="balance" style={{color: getProfileBalanceColor(profileData?.balance)}}>{(profileData?.balance ?? 0).toFixed(2)}</div>
            </div>
        )}
        {('hourlyRate' in profileData!) && profileData.hourlyRate && (
            <div className="mt-5 simple-text d-flex justify-content-center flex-column">
                <h2 className="greyH2">Hourly Rate</h2>
                <div className="balance">{profileData.hourlyRate.toFixed(2)}</div>
            </div>
        )}
        <div className="mt-5 simple-text d-flex justify-content-center flex-column">
            <h2 className="greyH2">Number of Classes</h2>
            <div className="balance">{profileData!.numberOfClasses}</div>
        </div>
    </div>
);

export const ProfileMainContent = ({ profileData, userType }: IProfileViewProps) => (
    <div className="main-content">

        {profileData?.isPublic && (userType === "Student") && (
            <Link to={`/reserve-lesson`} state={{ tutorId: profileData?.id }} className="reserve-lesson-button">
                Reserve Lesson
            </Link>
        )}
        {!profileData?.isPublic && (
            <Link to={`/profile`} className="edit-button">
                <PencilIcon style={{height: "60px"}} />
            </Link>
        )}
        <h2 className="greyH2">Title</h2>
        <p className="mt-2 simple-text">{profileData?.title}</p>
        <h2 className="greyH2">Bio</h2>
        <p className="mt-2 simple-text">{profileData?.bio}</p>
        <h2 className="mt-2 greyH2">Details</h2>
        <div className="mt-4 mb-4 d-flex justify-content-around">
            <div className="simple-text">Phone: {profileData?.mobilePhone}</div>
            {!profileData?.isPublic && (
                <div className="simple-text">Notifications: {profileData?.notificationsEnabled ? '✅' : '❌'}</div>
            )}
        </div>
        {('availabilities' in profileData!) && profileData.availabilities && (
            <>
                <h2 className="greyH2">Availabilities</h2>
                {profileData.availabilities.map((availability, index) => (
                    <div className="mt-2 simple-text" key={index}>
                        <span>{EDayOfTheWeek[availability.dayOfTheWeek]} → </span>
                        <span>{availability.fromHours.split(':').slice(0, 2).join(':')}-</span>
                        <span>{availability.toHours.split(':').slice(0, 2).join(':')}</span>
                    </div>
                ))}
            </>
        )}
        <h2 className="mt-3 greyH2">Subjects</h2>
        <div className="subject-list">
            {profileData?.subjects.map((subject: ISubjectListElement) => (
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
    </div>
);
