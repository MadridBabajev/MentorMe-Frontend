import {EDayOfTheWeek} from "../enums/EDayOfTheWeek";

export interface IAvailability {
    fromHours: string,
    toHours: string,
    dayOfTheWeek: EDayOfTheWeek
}