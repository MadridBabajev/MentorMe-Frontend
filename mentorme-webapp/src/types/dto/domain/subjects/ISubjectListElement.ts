import {IBaseEntity} from "../base/IBaseEntity";

export interface ISubjectListElement extends IBaseEntity {
    name: string;
    subjectPicture: Uint8Array | null;
}
