import {IUpdatedProfileData} from "../../../types/dto/domain/profiles/IUpdatedProfileData";
import {ValidationErrors} from "../../../types/strings/ValidationErrors";
import {Patterns} from "../../../types/strings/Patterns";

export const ValidateProfileInputs = (updatedProfileData: IUpdatedProfileData): string[] => {
    const validationErrors: string[] = [];
    const { firstName, lastName, mobilePhone, title, bio } = updatedProfileData;

    if (!firstName || firstName.trim().length === 0 || firstName.length > 32) {
        validationErrors.push(ValidationErrors.FIRST_NAME_EMPTY);
    }

    if (!lastName || lastName.trim().length === 0 || lastName.length > 32) {
        validationErrors.push(ValidationErrors.LAST_NAME_EMPTY);
    }

    const mobilePhoneRegex = new RegExp(Patterns.VALID_MOBILE);

    if (!mobilePhone || !mobilePhoneRegex.test(mobilePhone)) {
        validationErrors.push(ValidationErrors.MOBILE_INVALID);
    }

    if (title.length > 64) {
        validationErrors.push(ValidationErrors.TITLE_TOO_BIG);
    }

    if (bio.length > 2048) {
        validationErrors.push(ValidationErrors.BIO_TOO_BIG);
    }

    return validationErrors;
}