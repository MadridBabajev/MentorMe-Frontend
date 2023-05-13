import {EDayOfTheWeek} from "./EDayOfTheWeek";

export interface IAvailability {
    fromHours: string,
    toHours: string,
    dayOfTheWeek: EDayOfTheWeek
}