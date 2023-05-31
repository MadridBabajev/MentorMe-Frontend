
import { ValidateAuthenticationInputs } from "../services/helpers/validations/ValidateAuthenticationInputs";
import {IRegisterData} from "../types/dto/identity/IRegisterData";
import RegisterView from "./route-views/RegisterView";
import {ECountries} from "../types/dto/domain/enums/ECountries";
import {UseIdentityForm} from "../services/helpers/custom-hooks/UseIdentityForm";
import {UseHandleJwtResponse} from "../services/helpers/custom-hooks/UseHandleJwtResponse";

const Register = () => {
    const initialValues: IRegisterData = {
        password: "",
        confirmPassword: "",
        email: "",
        mobilePhone: "",
        firstName: "",
        lastName: "",
        isTutor: false,
        country: ECountries.Estonia
    };

    const {
        values,
        jwtData,
        handleChange,
        handleChangeSelect,
        onSubmit,
        validationErrors
    } = UseIdentityForm(initialValues, ValidateAuthenticationInputs, "register");

    UseHandleJwtResponse(jwtData);

    return (
        <RegisterView
            values={values as IRegisterData}
            handleChange={handleChange}
            handleChangeSelect={handleChangeSelect}
            onSubmit={onSubmit}
            validationErrors={validationErrors}
        />
    );
}
export default Register;