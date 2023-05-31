import {IBaseEntity} from "../base/IBaseEntity";

export interface IUpdatedProfileData extends IBaseEntity {
    firstName: string;
    lastName: string;
    mobilePhone: string;
    title: string;
    bio: string;
    userType: string;
    profilePicture: Uint8Array | string | null;
    hourlyRate: number | null;
}
