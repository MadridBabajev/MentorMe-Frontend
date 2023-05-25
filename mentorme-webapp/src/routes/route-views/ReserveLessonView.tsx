import {IReserveLessonProps} from "../../types/props/lessons/IReserveLessonProps";
import {Loader} from "../../components/layout/Loader";
import "../../styles/pages/reserve-lesson.css";
import React from "react";
import {Card} from "react-bootstrap";
import {ICalendarViewProps} from "../../types/props/lessons/ICalendarViewProps";
import {Calendar} from "../authorized/ReserveLesson";
import {IPaymentMethodsSelectionProps} from "../../types/props/lessons/IPaymentMethodsSelectionProps";
import {ISubjectSelectionProps} from "../../types/props/lessons/ISubjectSelectionProps";
export const ReserveLessonView = (props: IReserveLessonProps) => {
    if (!props.reserveLessonData) {
        // Loading state or handle error
        return <Loader />;
    }

    const { paymentMethods, availabilities, subjects } = props.reserveLessonData;

    return (
        <div className="reserve-lesson-container">
            <h2 className="mainH1">Reserve your Lesson</h2>
            {props.showValidationMessage && <p className="error-message">Please select all fields before reserving a lesson.</p>}
            <div className="mt-5 selections-container">
                <SubjectSelection
                    subjects={subjects}
                    reserveLessonValues={props.reserveLessonValues}
                    setReserveLessonValues={props.setReserveLessonValues}
                />
                <PaymentMethodsSelection
                    paymentMethods={paymentMethods}
                    reserveLessonValues={props.reserveLessonValues}
                    setReserveLessonValues={props.setReserveLessonValues}
                />
            </div>
            <div className="mt-5 calendar-container">
                <h3 className="mb-5 greyH2 centered">Calendar:</h3>
                <Calendar
                    availabilities={availabilities}
                    onSelectTime={props.handleSelectTime}
                    selectedTimeSlot={props.selectedTimeSlot}
                />
            </div>
            <button className="reserve-page-lesson-button" onClick={props.onReserve}>Reserve</button>
        </div>
    );
};

export const CalendarView = (props: ICalendarViewProps) => {
    return (
        <div className="calendar">
            {props.calendar.map((week, i) => (
                <div key={i} className="week">
                    {week.map((day) => (
                        <Card
                            style={{ width: "180px" }}
                            key={day.toISOString()}
                            className="day">
                            <Card.Header
                                style={{ backgroundColor: "#218838", color: "white" }}>
                                <Card.Title
                                    style={{
                                        fontFamily: "'Comfortaa', 'Quicksand', sans-serif",
                                    }}>
                                    {day.toLocaleDateString("en-US", { weekday: "long" })}
                                </Card.Title>
                                <Card.Subtitle style={{ color: "black" }} className="simple-text">
                                    {day.toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body><div className="selection-container">{props.renderTimeSlots(day).map((slot) => slot.element)}</div></Card.Body>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}

export const SubjectSelection = ({subjects, reserveLessonValues, setReserveLessonValues}: ISubjectSelectionProps) => (
    <div className="selection-container">
        <h3 className="greyH2">Subjects:</h3>
        {subjects.map((subject) => (
            <div key={subject.id} className="select-option">
                <input
                    id={`subject-${subject.id}`}
                    type="radio"
                    name="subject"
                    checked={reserveLessonValues.selectedSubject === subject.id}
                    onChange={() =>
                        setReserveLessonValues({
                            ...reserveLessonValues,
                            selectedSubject: subject.id!,
                        })
                    }
                />
                <label htmlFor={`subject-${subject.id}`}>
                    {subject.name}
                </label>
            </div>
        ))}
    </div>
);

export const PaymentMethodsSelection = ({paymentMethods, reserveLessonValues, setReserveLessonValues}: IPaymentMethodsSelectionProps) => (
    <div className="selection-container">
        <h3 className="greyH2">Payment Methods:</h3>
        {paymentMethods.map((paymentMethod) => (
            <div key={paymentMethod.id} className="select-option">
                <input
                    id={`payment-${paymentMethod.id}`}
                    type="radio"
                    name="paymentMethod"
                    checked={reserveLessonValues.selectedPaymentMethod === paymentMethod.id}
                    onChange={() =>
                        setReserveLessonValues({
                            ...reserveLessonValues,
                            selectedPaymentMethod: paymentMethod.id!,
                        })
                    }
                />
                <label htmlFor={`payment-${paymentMethod.id}`}>
                    {paymentMethod.details}
                </label>
            </div>
        ))}
    </div>
);
