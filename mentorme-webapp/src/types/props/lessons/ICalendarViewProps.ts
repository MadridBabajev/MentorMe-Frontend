export interface ICalendarViewProps {
    calendar: Date[][];
    renderTimeSlots: (day: Date) => {
        key: string;
        element: JSX.Element;
    }[];
}