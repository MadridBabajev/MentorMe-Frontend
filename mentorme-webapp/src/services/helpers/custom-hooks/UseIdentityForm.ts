import { MouseEvent, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import JwtContext from "../../../types/context/JwtContext";
import {IdentityService} from "../../app-services/IdentityService";
import {ILoginData} from "../../../types/dto/identity/ILoginData";
import {IRegisterData} from "../../../types/dto/identity/IRegisterData";
import IJWTResponse from "../../../types/dto/identity/IJWTResponse";
import {ECountries} from "../../../types/dto/domain/enums/ECountries";
import {IdentityServiceResponse} from "../../../types/dto/identity/IdentityServiceResponse";
import {notificationManager} from "../NotificationManager";
import {Notifications} from "../../../types/strings/Notifications";
import {Navigations} from "../../../types/strings/Navigations";
import {LocalStorage} from "../../../types/strings/LocalStorage";
type SubmitFunctionType = "login" | "register";
type InitialValuesType = ILoginData | IRegisterData;
type ValidateInputsFunction = (values: ILoginData | IRegisterData) => string[];

export const UseIdentityForm = (
    initialValues: InitialValuesType,
    validateInputs: ValidateInputsFunction,
    submitFunction: SubmitFunctionType
) => {
    const navigate = useNavigate();
    const {setJwtResponse} = useContext(JwtContext);
    const identityService = new IdentityService();
    const [jwtData, setJwtData] = useState<IJWTResponse | undefined>();

    const [values, setInput] = useState(initialValues);
    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setInput({ ...values, [target.name]: value });
    }

    const handleChangeSelect = (target: EventTarget & HTMLSelectElement) => {
        setInput({ ...values, [target.name]: target.value });
    }

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const errors = validateInputs(values);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors([]);

        let formattedValues = {...values};

        if ('country' in values) {
            formattedValues = {
                ...values,
                country: ECountries[values.country]
            };
        }

        let response: IdentityServiceResponse | undefined;
        if (submitFunction === 'login') {
            response = await identityService.login(formattedValues as ILoginData);
        } else if (submitFunction === 'register') {
            response = await identityService.register(formattedValues as IRegisterData);
        }

        if (!response) {
            setValidationErrors(["Error while authenticating"]);
            return;
        }

        const [jwtData, error] = response;

        if (error) {
            setValidationErrors([error.Error || "Unknown error"]);
            return;
        }

        if (jwtData) {
            setJwtData(jwtData);
            await setJwtResponse!(jwtData);

            localStorage.setItem(LocalStorage.JWT, jwtData.jwt);
            localStorage.setItem(LocalStorage.REFRESH_TOKEN, jwtData.refreshToken);

            const expiryTime = Date.now() + (jwtData.expiresIn * 1000);
            localStorage.setItem(LocalStorage.EXPIRY, String(expiryTime));

            notificationManager.showSuccessNotification(Notifications.USER_AUTHORIZED);
            navigate(Navigations.PROFILE, { state: { jwtData } });
        }
    }

    return {
        values,
        jwtData,
        handleChange,
        handleChangeSelect,
        onSubmit,
        validationErrors
    }
}