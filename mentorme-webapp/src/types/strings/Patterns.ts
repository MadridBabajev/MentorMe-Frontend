
export enum Patterns {
    ALLOWED_NUMBER_INPUTS = "Digit[0-9]|NumpadDecimal|Period|Minus|NumpadSubtract|Backspace",
    VALID_EMAIL = "^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$",
    VALID_PASSWORD = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[a-zA-Z]).{8,}$",
    VALID_BANK_ACCOUNT_NUMBER = "^\\d{14,18}$",
    VALID_MOBILE = "^(\\+)?\\d{8,14}$",
    DECODE_IMG = "data:image/jpeg;base64,"
}
