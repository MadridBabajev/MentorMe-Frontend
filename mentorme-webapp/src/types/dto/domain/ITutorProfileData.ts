import {IStudentProfileData} from "./IStudentProfileData";
import {IAvailability} from "./IAvailability";

export interface ITutorProfileData extends IStudentProfileData {
    hourlyRate: number;
    availabilities: Array<IAvailability>;
}