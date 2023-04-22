
import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterData } from "../types/dto/IRegisterData";
import { IdentityService } from "../services/app-services/IdentityService";
import JwtContext from "../types/context/JwtContext";
import RegisterView from "./route-views/RegisterView";
import { ValidateRegisterInputs } from "../services/helpers/ValidateRegisterInputs";

const Register = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        password: "",
        confirmPassword: "",
        email: "",
        mobilePhone: "",
        firstName: "",
        lastName: "",
        isTutor: false
    } as IRegisterData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        // debugger;
        // console.log(target.name, target.value, target.type)
        const value = target.type === "checkbox" ?
            target.checked : target.value;
        setInput({ ...values, [target.name]: value });
    }

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        // console.log('onSubmit', event);
        event.preventDefault();

        if (ValidateRegisterInputs(values)) {
            setValidationErrors(["Bad input values!"]);
            return;
        }
        // remove errors
        setValidationErrors([]);

        let jwtData = await identityService.register(values);

        if (jwtData == undefined) {
            // TODO: get error info
            setValidationErrors(["no jwt"]);
            return;
        }

        if (setJwtResponse){
            setJwtResponse(jwtData);
            navigate("/");
        }
    }

    return (
        <RegisterView values={values}
                      handleChange={handleChange}
                      onSubmit={onSubmit}
                      validationErrors={validationErrors} />
    );
}

export default Register;