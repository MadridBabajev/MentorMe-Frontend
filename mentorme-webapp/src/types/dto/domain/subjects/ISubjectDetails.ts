import {IBaseEntity} from "../base/IBaseEntity";

export interface ISubjectDetails extends IBaseEntity {
    name: string;
    description: string;
    taughtBy: number;
    learnedBy: number;
    subjectPicture: Uint8Array;
    isAdded: boolean | null;
}
