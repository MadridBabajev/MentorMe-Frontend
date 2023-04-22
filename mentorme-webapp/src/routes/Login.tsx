import LoginView from "./route-views/LoginView";
import {IdentityService} from "../services/app-services/IdentityService";
import JwtContext from "../types/context/JwtContext";
import {MouseEvent, useContext, useState} from "react";
import {ILoginData} from "../types/dto/ILoginData";
import {useNavigate} from "react-router-dom";
import {ValidateLoginInputs} from "../services/helpers/ValidateLoginInputs";

const Login = () => {
    const navigate = useNavigate();

    const [values, setInput] = useState({
        email: "",
        password: "",
        isTutor: false
    } as ILoginData);

    const [validationErrors, setValidationErrors] = useState([] as string[]);

    const handleChange = (target: EventTarget & HTMLInputElement) => {
        // debugger;
        // console.log(target.name, target.value, target.type)
        const value = target.type === "checkbox" ?
            target.checked : target.value;
        setInput({ ...values, [target.name]: value });
    }

    const {jwtResponse, setJwtResponse} = useContext(JwtContext);

    const identityService = new IdentityService();

    const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (ValidateLoginInputs(values)) {
            setValidationErrors(["Bad input values!"]);
            return;
        }
        // remove errors
        setValidationErrors([]);

        let jwtData = await identityService.login(values);

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
        <LoginView values={values}
                   handleChange={handleChange}
                   onSubmit={onSubmit}
                   validationErrors={validationErrors} />
    );
}

export default Login;