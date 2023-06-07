import {BaseEntityService} from "../base-services/BaseEntityService";
import {ITutorBankingDetails} from "../../types/dto/domain/profiles/ITutorBankingDetails";
import {HostURLs} from "../../types/strings/HostURLs";

export class BankingDetailsService extends BaseEntityService<ITutorBankingDetails> {
    constructor() {
        super(HostURLs.PROFILE_CONTROLLER);
    }

    async updateBankingDetails(updatedBankingDetails: ITutorBankingDetails) {
        try {
            return await this.axios.put(HostURLs.EDIT_BANKING_DETAILS, updatedBankingDetails);
        } catch (error) {
            console.error(`Failed to edit the banking details: ${error}`);
        }
    }
}