import {IBaseEntity} from "./base/IBaseEntity";

export interface ITutorSearch extends IBaseEntity {
    firstName: string;
    lastName: string;
    title: string;
    hourlyRate: number;
    averageRating: number;
    classesTutored: number;
    profilePicture?: Uint8Array
}