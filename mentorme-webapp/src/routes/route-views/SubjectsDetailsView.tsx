import {FaPlus, FaTimes} from "react-icons/fa";
import React from "react";
import {ISubjectDetailsViewProps} from "../../types/props/lessons/ISubjectDetailsViewProps";


export const SubjectsDetailsView = (props: ISubjectDetailsViewProps) => {

    return (
        <div className="subject-details">
            <div className="subject-image">
                <img src={props.imageSrc} alt={props.subject?.name} />
                {props.subject?.isAdded !== null && (
            <div className="subject-action">
            <button className={`add-remove-button ${props.subject?.isAdded ? "remove" : "add"}`} onClick={props.handleSubjectAddRemove}>
                {props.subject?.isAdded ? <FaTimes/> : <FaPlus/>}
            </button>
            </div>
        )}
            <div className="subject-info">
                <div className="info-box">
                    <div className="number">{props.subject?.learnedBy}</div>
                    <div className="text">students learning</div>
                </div>
                <div className="info-box">
                    <div className="number">{props.subject?.taughtBy}</div>
                    <div className="text">tutors teaching</div>
                </div>
            </div>
        </div>
        <h2 className="subject-title">{props.subject?.name}</h2>
        <p className="subject-description">{props.subject?.description}</p>
        </div>
    );
}