import {IStudentProfileData} from "../../dto/domain/profiles/IStudentProfileData";
import {ITutorProfileData} from "../../dto/domain/profiles/ITutorProfileData";
import {IBaseEntity} from "../../dto/domain/base/IBaseEntity";

export interface IProfileViewProps extends IBaseEntity {
    profileData: IStudentProfileData | ITutorProfileData | undefined;
    userType: string;
}