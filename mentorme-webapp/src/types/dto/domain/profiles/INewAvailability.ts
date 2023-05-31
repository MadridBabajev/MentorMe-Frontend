import {EDayOfTheWeek} from "../enums/EDayOfTheWeek";

export interface INewAvailability {
    fromHours: string;
    toHours: string;
    dayOfTheWeek: EDayOfTheWeek
}