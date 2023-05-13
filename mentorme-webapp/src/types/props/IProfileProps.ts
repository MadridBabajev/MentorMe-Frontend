import {IStudentProfileData} from "../dto/domain/IStudentProfileData";
import {ITutorProfileData} from "../dto/domain/ITutorProfileData";
import {IBaseEntity} from "../dto/domain/base/IBaseEntity";

export interface IProfileProps extends IBaseEntity {
    profileData: IStudentProfileData | ITutorProfileData | undefined;
    isPublic: boolean | undefined;
}