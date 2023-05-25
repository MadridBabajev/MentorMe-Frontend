import {IBaseEntity} from "../base/IBaseEntity";

export interface IProfileCardData extends IBaseEntity{
    fullName: string;
    averageRating: number;
    profilePicture: Uint8Array | null;
}