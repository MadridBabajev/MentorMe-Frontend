
export enum HostURLs {
    // == Controllers ==
    HOST_BASE_URL = "http://localhost:80/api/",
    ACCOUNT_CONTROLLER = "v1/identity/account/",
    PROFILE_CONTROLLER = "v1/profile/",
    LESSONS_CONTROLLER = "v1/lessons/",
    SUBJECTS_CONTROLLER = "v1/subjects/",
    PAYMENT_METHOD_CONTROLLER = "v1/paymentMethod/",
    AVAILABILITY_CONTROLLER = "v1/availability/",
    AI_MODELS_CONTROLLER = "v1/aiModels/",

    // == Actions ==
    // Identity
    REFRESH_JWT_TOKEN = "RefreshToken",
    REGISTER = "Register",
    LOGIN = "Login",
    LOGOUT = "Logout",
    // Lessons
    GET_RESERVE_LESSON_DATA = "GetReserveLessonData",
    RESERVE_LESSON = "ReserveLesson",
    LEAVE_REVIEW = "LeaveReview",
    ACCEPT_DECLINE_LESSON = "AcceptDeclineLesson",
    CANCEL_LESSON = "CancelLesson",
    ADD_TAG = "AddTag",
    REMOVE_TAG = "RemoveTag",
    // Availability & Payment methods
    ADD_AVAILABILITY = "AddAvailability",
    REMOVE_AVAILABILITY = "RemoveAvailability",
    ADD_PAYMENT_METHOD = "AddPaymentMethod",
    REMOVE_PAYMENT_METHOD = "RemovePaymentMethod",
    // Profile
    EDIT_BANKING_DETAILS = "EditTutorBankingDetails",
    EDIT_PROFILE_DETAILS = "EditProfileData",
    SUBJECT_ACTION = "AddRemoveSubject"
}
