import {IBaseEntity} from "../base/IBaseEntity";
import {EBankAccountType} from "../enums/EBankAccountType";

export interface ITutorBankingDetails extends IBaseEntity {
    bankAccountNumber: string;
    bankAccountName: string;
    bankAccountType: EBankAccountType;
}