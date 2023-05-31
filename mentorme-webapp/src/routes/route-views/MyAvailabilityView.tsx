import {IMyAvailabilityViewsProps} from "../../types/props/availabilities/IMyAvailabilityViewsProps";
import React, {useState} from "react";
import {IAvailabilityRowProps} from "../../types/props/availabilities/IAvailabilityRowProps";
import {Button, Modal} from "react-bootstrap";
import {EDayOfTheWeek} from "../../types/dto/domain/enums/EDayOfTheWeek";
import Select from 'react-select';
import "../../styles/pages/availability.css"
import {IAvailabilityFormViewProps} from "../../types/props/availabilities/IAvailabilityFormViewProps";
import {AvailabilityForm} from "../authorized/MyAvailability";

const dayOfTheWeekMap: {[key in EDayOfTheWeek]: string} = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
};

const dayOfTheWeekOptions = [
    { value: EDayOfTheWeek.Monday, label: 'Mon' },
    { value: EDayOfTheWeek.Tuesday, label: 'Tue' },
    { value: EDayOfTheWeek.Wednesday, label: 'Wed' },
    { value: EDayOfTheWeek.Thursday, label: 'Thu' },
    { value: EDayOfTheWeek.Friday, label: 'Fri' },
    { value: EDayOfTheWeek.Saturday, label: 'Sat' },
    { value: EDayOfTheWeek.Sunday, label: 'Sun' },
];
export const MyAvailabilityView = (props: IMyAvailabilityViewsProps) => {
    return (
        <div>
            <h3 style={{textAlign: "center", marginTop: "180px"}} className="mb-4 mainH1">My Availability</h3>
            <div className="availability-form-container">
                <AvailabilityForm {...props} />
            </div>
            <div className="availabilities-container">
                <table className="availabilities-table table table-striped table-hover">
                    <thead>
                    <tr className="table-success">
                        <th>#</th>
                        <th>Day of the Week</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.availabilities
                        .sort((a, b) =>  a.dayOfTheWeek - b.dayOfTheWeek)
                        .map((a, index) => (
                            <AvailabilityRow availability={a} onRemove={props.handleRemove} rowIndex={index+1} key={a.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const AvailabilityFormView = (props: IAvailabilityFormViewProps) => {

    return (
        <form onSubmit={props.handleSubmit} className="availability-form">
            <div>
                {dayOfTheWeekOptions.map(option => (
                    <div key={option.value} className={`week-day-option ${props.values?.dayOfTheWeek === option.value ? "week-day-option-selected" : ""}`} onClick={() => props.handleDayChange(option.value)}>
                        {option.label}
                    </div>
                ))}
            </div>
            <div style={{margin: "10px"}} className="d-flex flex-row">
                <div style={{marginRight: "5px"}}>
                    <label className="simple-text">From:</label>
                    <Select className="hour-option" options={props.hourOptions}
                            onChange={props.handleFromHourChange}
                            placeholder="From"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.isFocused ? '#218838' : provided.borderColor,
                                    boxShadow: state.isFocused ? '0 0 0 1px #218838' : provided.boxShadow,
                                    '&:hover': {
                                        borderColor: '#218838',
                                        boxShadow: '0 0 0 1px #218838',
                                    },
                                }),
                            }}
                    />
                </div>
                <div style={{marginLeft: "5px"}}>
                    <label className="simple-text">To:</label>
                    <Select className="hour-option" options={props.hourOptions}
                            onChange={props.handleToHourChange}
                            placeholder="To"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.isFocused ? '#218838' : provided.borderColor,
                                    boxShadow: state.isFocused ? '0 0 0 1px #218838' : provided.boxShadow,
                                    '&:hover': {
                                        borderColor: '#218838',
                                        boxShadow: '0 0 0 1px #218838',
                                    },
                                }),
                            }}
                    />
                </div>
            </div>
            {props.validationErrors.length > 0 &&
                <ErrorMessage errors={props.validationErrors} />}
            <button type="submit">Submit</button>
        </form>
    );
}

const ErrorMessage = ({ errors }: { errors: string[] }) => (
    <div className="error-message">
        {errors.map((error, i) => (
            <div key={i}>{error}</div>
        ))}
    </div>
)

const AvailabilityRow = ({availability, onRemove, rowIndex}: IAvailabilityRowProps) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = () => {
        handleClose();
        onRemove(availability.id!);
    };

    const removeSeconds = (time: string) => {
        let timeParts = time.split(":");
        return `${timeParts[0]}:${timeParts[1]}`;
    };

    return (
        <tr className="availability-row">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm availability removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this availability?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
            <td className="simple-text">{rowIndex}</td>
            <td className="simple-text">{dayOfTheWeekMap[availability.dayOfTheWeek]}</td>
            <td className="simple-text">{removeSeconds(availability.fromHours)}</td>
            <td className="simple-text">{removeSeconds(availability.toHours)}</td>
            <td>
                <button className="btn btn-danger" onClick={handleShow}>Remove</button>
            </td>
        </tr>
    );
}
