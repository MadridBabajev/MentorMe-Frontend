import LoginView from "./route-views/LoginView";
import {ILoginData} from "../types/dto/identity/ILoginData";
import {UseIdentityForm} from "../services/helpers/custom-hooks/UseIdentityForm";
import {UseHandleJwtResponse} from "../services/helpers/custom-hooks/UseHandleJwtResponse";
import {ValidateAuthenticationInputs} from "../services/helpers/validations/ValidateAuthenticationInputs";

const Login = () => {
    const initialValues: ILoginData = {
        email: "",
        password: "",
        isTutor: false
    };

    const {
        values,
        jwtData,
        handleChange,
        onSubmit,
        validationErrors
    } = UseIdentityForm(initialValues, ValidateAuthenticationInputs, "login");

    UseHandleJwtResponse(jwtData);

    return (
        <LoginView
            values={values}
            handleChange={handleChange}
            onSubmit={onSubmit}
            validationErrors={validationErrors}
        />
    );
}

export default Login;