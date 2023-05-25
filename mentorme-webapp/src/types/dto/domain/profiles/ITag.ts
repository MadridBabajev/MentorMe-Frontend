import {IBaseEntity} from "../base/IBaseEntity";

export interface ITag extends IBaseEntity{
    name: string;
    description: string;
    addedAt: Date;
}
