import {IBaseEntity} from "./IBaseEntity";
import {ISubjectListElement} from "../subjects/ISubjectListElement";

export interface IBaseUserData extends IBaseEntity {
    notificationsEnabled: boolean,
    firstName: string,
    lastName: string,
    mobilePhone: string,
    balance: number,
    averageRating: number,
    title: string,
    bio: string,
    profilePicture: Uint8Array | null,
    subjects: ISubjectListElement[],
    isPublic: boolean
    numberOfClasses: number
}
