import {ITutorBankingDetails} from "../../../types/dto/domain/profiles/ITutorBankingDetails";
import {ValidationErrors} from "../../../types/strings/ValidationErrors";
import {Patterns} from "../../../types/strings/Patterns";

export const ValidateBankingDetailsInputs = (updatedBankingDetails: ITutorBankingDetails): string[] => {
    const validationErrors: string[] = [];
    const { bankAccountName, bankAccountNumber, bankAccountType } = updatedBankingDetails;

    if (bankAccountName.trim() === "") {
        validationErrors.push(ValidationErrors.FIRST_NAME_REQUIRED.replace("First name", "Bank Account Name"));
    }

    const accountNumberRegex = new RegExp(Patterns.VALID_BANK_ACCOUNT_NUMBER);

    // Account number is numeric
    if (!accountNumberRegex.test(bankAccountNumber)) {
        validationErrors.push(ValidationErrors.BANK_ACCOUNT_NUMBER_INVALID);
    }

    // bankAccountType can only be 'Personal' (0) or 'Business' (1)
    if (bankAccountType.toString() !== "0" && bankAccountType.toString() !== "1") {
        validationErrors.push(ValidationErrors.ACCOUNT_TYPE_INVALID);
    }

    return validationErrors;
}
