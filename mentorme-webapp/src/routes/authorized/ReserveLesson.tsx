import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {CalendarView, ReserveLessonView} from "../route-views/ReserveLessonView";
import { ReserveLessonService } from "../../services/app-services/ReserveLessonService";
import { IReserveLessonData } from "../../types/props/lessons/IReserveLessonData";
import { IReserveLessonValues } from "../../types/props/lessons/IReserveLessonValues";
import {ICalendarProps} from "../../types/props/lessons/ICalendarProps";

export type TimeSlot = {
    startTime: Date;
    endTime: Date;
};

const ReserveLesson = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const visitedTutorId = location.state?.tutorId;
    const reserveLessonService = new ReserveLessonService();
    const [showValidationMessage, setShowValidationMessage] = useState(false);

    const [reserveLessonData, setReserveLessonData] = useState<IReserveLessonData | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [reserveLessonValues, setReserveLessonValues] = useState<IReserveLessonValues>({
        tutorId: visitedTutorId,
        selectedPaymentMethod: null,
        selectedSubject: null,
        lessonStartDate: null,
        lessonEndDate: null,
    });

    useEffect(() => {

        const fetchReserveLessonData = async () => {
            try {
                const response = await reserveLessonService.getReserveLessonData(visitedTutorId);
                setReserveLessonData(response);
            } catch (error) {
                console.error('Error fetching reserve lesson data:', error);
            }
        };
        fetchReserveLessonData().catch(() => {
            console.log("Failed to fetch Reserve lesson data..")});

    }, [navigate, visitedTutorId]);

    const onReserve = async () => {
        // Validate selection
        if (
            !reserveLessonValues.tutorId ||
            !reserveLessonValues.selectedSubject ||
            !reserveLessonValues.selectedPaymentMethod ||
            !reserveLessonValues.lessonStartDate ||
            !reserveLessonValues.lessonEndDate
        ) {
            setShowValidationMessage(true);
            return;
        }

        setShowValidationMessage(false);

        try {
            // Create lesson by sending the selected values to the backend
            const response =
                await reserveLessonService.reserveLesson(reserveLessonValues);
            const lessonId = response!.lessonId;

            // Redirect to the lesson page
            navigate(`/lesson/${lessonId}`);
        } catch (error) {
            console.error('Error reserving lesson:', error);
        }
    };

    const handleSelectTime = (timeSlot: TimeSlot) => {
        setSelectedTimeSlot(timeSlot);
        setReserveLessonValues({
            ...reserveLessonValues,
            lessonStartDate: timeSlot.startTime,
            lessonEndDate: timeSlot.endTime,
        });

    };

    useEffect(() => {
        console.log('Current values:', reserveLessonValues);
    }, [reserveLessonValues]);

    return (
        <ReserveLessonView
            onReserve={onReserve}
            handleSelectTime={handleSelectTime}
            reserveLessonData={reserveLessonData}
            reserveLessonValues={reserveLessonValues}
            selectedTimeSlot={selectedTimeSlot}
            setReserveLessonValues={setReserveLessonValues}
            showValidationMessage={showValidationMessage}
        />
    );
};

export default ReserveLesson;

export const Calendar = ({ availabilities, onSelectTime, selectedTimeSlot }: ICalendarProps) => {
    const [calendar, setCalendar] = useState<Date[][]>([]);

    useEffect(() => {
        const start = new Date();
        const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);
        setCalendar(createCalendar(start, end));
    }, []);

    const renderTimeSlots = (day: Date) => {
        const availabilitiesForDay = availabilities.filter(
            (a) => a.dayOfTheWeek === day.getDay()
        );

        return availabilitiesForDay.flatMap((availability) => {
            const startTime = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate(),
                Number(availability.fromHours.split(":")[0]),
                Number(availability.fromHours.split(":")[1])
            );
            const endTime = new Date(
                day.getFullYear(),
                day.getMonth(),
                day.getDate(),
                Number(availability.toHours.split(":")[0]),
                Number(availability.toHours.split(":")[1])
            );

            let currentTime = startTime;
            let timeSlots = [];

            while (currentTime < endTime) {
                const nextTime = new Date(
                    currentTime.getTime() + 60 * 60 * 1000
                ); // Add 1 hour
                const timeSlotKey = `${currentTime.toISOString()}-${nextTime.toISOString()}`;

                timeSlots.push({
                    key: timeSlotKey,
                    element: (
                        <label
                            key={timeSlotKey}
                            className={`time-slot ${
                                selectedTimeSlot &&
                                selectedTimeSlot.startTime.getTime() === currentTime.getTime() &&
                                selectedTimeSlot.endTime.getTime() === nextTime.getTime()
                                    ? "selected"
                                    : ""
                            }`}>
                            <input
                                type="radio"
                                name="timeSlot"
                                checked={
                                    !!(selectedTimeSlot &&
                                        selectedTimeSlot.startTime.getTime() ===
                                        currentTime.getTime() &&
                                        selectedTimeSlot.endTime.getTime() === nextTime.getTime())
                                }
                                onChange={() => {
                                    const selectedStartTime = new Date(nextTime);
                                    selectedStartTime.setHours(selectedStartTime.getHours() - 1);
                                    const selectedEndTime = new Date(nextTime);
                                    onSelectTime({
                                        startTime: selectedStartTime,
                                        endTime: selectedEndTime,
                                    });
                                }}
                            />
                            <span>{formatTime(currentTime)} - {formatTime(nextTime)}</span>
                        </label>
                    ),
                });

                currentTime = nextTime;
            }

            return timeSlots;
        });
    };

    const createCalendar = (start: Date, end: Date): Date[][] => {
        let current = start;
        let weeks = [];

        while (current <= end) {
            let week = [];

            for (let i = 0; i < 7; i++) {
                week.push(current);
                current = new Date(current.getTime() + 24 * 60 * 60 * 1000); // next day
            }

            weeks.push(week);
        }

        return weeks;
    };

    const formatTime = (time: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
        };
        return time.toLocaleTimeString([], options);
    };
    return (
        <CalendarView
            calendar={calendar}
            renderTimeSlots={renderTimeSlots}
        />
    );
};