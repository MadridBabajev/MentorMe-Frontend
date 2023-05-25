import {IAvailability} from "../../dto/domain/profiles/IAvailability";
import {TimeSlot} from "../../../routes/authorized/ReserveLesson";

export interface ICalendarProps {
    availabilities: IAvailability[];
    onSelectTime: (timeSlot: TimeSlot) => void;
    selectedTimeSlot: TimeSlot | null;
}