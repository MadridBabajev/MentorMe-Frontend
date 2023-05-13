import React from "react";
import { Card, Image } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {ISubjectListElement} from "../../types/dto/domain/ISubjectListElement";
import "../../styles/pages/profile.css";
import defaultImage from "../../assets/unknown-profile.png";
import {ReactComponent as PencilIcon} from '../../assets/pencil-icon.svg';
import {IProfileProps} from "../../types/props/IProfileProps";
import {EDayOfTheWeek} from "../../types/dto/domain/EDayOfTheWeek";

const getProfileBalanceColor = (balance: number | undefined): string =>
        balance && balance >= 0 ? 'green' : 'red';

export const ProfileSidebar = ({ profileData, isPublic }: IProfileProps) => (
    <div className="sidebar">
        <Image
            className="profile-picture"
            src={profileData?.profilePicture ? `data:image/png;base64,${profileData.profilePicture}` : defaultImage}
        />
        <div className="name-rating d-flex justify-content-center align-items-center">
            <div className="simple-text">{profileData?.firstName} {profileData?.lastName}</div>
            <div className="rating m-lg-2">
                <span className="star-icon">⭐</span>
                <span>{profileData?.averageRating}</span>
            </div>
        </div>
        {!isPublic && (
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
    </div>
);

export const ProfileMainContent = ({ profileData, isPublic, id }: IProfileProps) => (
    <div className="main-content">
        {!isPublic && (
            <Link to={`/profile/${id}`} className="edit-button">
                <PencilIcon />
            </Link>
        )}
        <h2 className="greyH2">Title</h2>
        <p className="mt-2 simple-text">{profileData?.title}</p>
        <h2 className="greyH2">Bio</h2>
        <p className="mt-2 simple-text">{profileData?.bio}</p>
        <h2 className="mt-2 greyH2">Details</h2>
        <div className="mt-4 mb-4 d-flex justify-content-around">
            <div className="simple-text">Phone: {profileData?.mobilePhone}</div>
            {!isPublic && (
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