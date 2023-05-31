import React, {useContext} from "react";
import {ITutorSearchProps} from "../../types/props/profiles/ITutorSearchProps";
import JwtContext from "../../types/context/JwtContext";
import {useNavigate} from "react-router-dom";
import {Card} from "react-bootstrap";
import {Navigations} from "../../types/strings/Navigations";
import {Patterns} from "../../types/strings/Patterns";
import {UserTypes} from "../../types/strings/UserTypes";
import defaultImage from "../../assets/unknown-profile.png";

export const TutorsSearchViews = (props: ITutorSearchProps) => {

    return (
        <div style={{marginTop: "200px"}} className="tutors-search-container">
            <h1 style={{textAlign: "center"}} className="mainH1">Tutors Search</h1>
            <TutorFilter {...props} />
            <TutorsList {...props} />
        </div>
    );
}

const TutorFilter = (props: ITutorSearchProps) => {
    return (
        <div className="filter-container">
            <h2 className="mt-3 greyH2">Filters</h2>
            <input type="text" name="firstName" value={props.filters.firstName || ''} onChange={props.handleFilterChange} placeholder="First Name" />
            <input type="text" name="lastName" value={props.filters.lastName || ''} onChange={props.handleFilterChange} placeholder="Last Name" />
            <input type="number" name="minClassesCount" value={props.filters.minClassesCount || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Min Classes Count" />
            <input type="number" name="maxClassesCount" value={props.filters.maxClassesCount || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Max Classes Count" />
            <input type="number" name="minHourlyRate" value={props.filters.minHourlyRate || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Min Hourly Rate" />
            <input type="number" name="maxHourlyRate" value={props.filters.maxHourlyRate || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Max Hourly Rate" />
            <input type="number" name="minAverageRating" value={props.filters.minAverageRating || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Min Average Rating" />
            <input type="number" name="maxAverageRating" value={props.filters.maxAverageRating || ''} onChange={props.handleFilterChange} onKeyDown={props.handleKeyPress} placeholder="Max Average Rating" />
            {props.subjects.map(subject => (
                <div className="form-check" key={subject.id}>
                    <label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="subjectIds"
                            value={subject.id}
                            checked={props.filters.subjectIds.includes(subject.id as string)}
                            onChange={(event) => {
                                props.handleCheckboxChange(subject.id as string, event.target.checked);
                            }}
                        />
                        {subject.name}
                    </label>
                </div>
            ))}
            <button onClick={props.handleFilterButtonClick}>Filter</button>
        </div>
    )
}

const TutorsList = (props: ITutorSearchProps) => {

    const { jwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();

    return (
        <div className="tutors-list-container">
            <h2 className="mb-3 mt-3 greyH2">Tutors</h2>
            {props.tutors.map(tutor => (
                <Card className="tutor-card" key={tutor.id} onClick={
                    () => {
                        if (jwtResponse === null) {
                            navigate(Navigations.LOGIN);
                        } else {
                            navigate(Navigations.PROFILE, { state: { id: tutor.id, visitedUserType: UserTypes.TUTOR } });
                        }
                    }}>
                    <Card.Body className="d-flex">
                        <div className="w-25">
                            <Card.Img className="tutor-image"
                                      src={tutor?.profilePicture ?
                                          `${Patterns.DECODE_IMG}${tutor.profilePicture}` : defaultImage}
                                      alt={`${tutor.firstName} ${tutor.lastName}`} />
                        </div>
                        <div className="tutor-details">
                            <div>{tutor.firstName} {tutor.lastName}</div>
                            <div className="simple-text mt-2">{tutor.title}</div>
                        </div>
                        <div className="tutor-stats">
                            <div className="text-right">🕒 Hourly Rate: {tutor.hourlyRate}</div>
                            <div className="text-right">⭐ Average Rating: {tutor.averageRating}</div>
                            <div className="text-right">🎓 Classes tutored: {tutor.classesTutored}</div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}
