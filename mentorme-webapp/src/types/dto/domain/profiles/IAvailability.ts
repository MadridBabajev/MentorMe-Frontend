import {EDayOfTheWeek} from "../enums/EDayOfTheWeek";
import {IBaseEntity} from "../base/IBaseEntity";

export interface IAvailability extends IBaseEntity {
    fromHours: string;
    toHours: string;
    dayOfTheWeek: EDayOfTheWeek;
}