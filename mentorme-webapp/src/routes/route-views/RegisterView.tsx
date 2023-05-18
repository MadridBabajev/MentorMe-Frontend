
import { IRegisterProps } from "../../types/props/IRegisterProps";
import {IRegisterInputProps} from "../../types/props/IRegisterInputProps";
import React from "react";
import {ECountries} from "../../types/dto/domain/ECountries";

const RegisterView = (props: IRegisterProps) => {

    return (
        <form>
            <h2 className="mainH1" style={{marginTop: "200px"}}>Become a user</h2>
            <hr />

            <ul style={{'display': props.validationErrors.length === 0 ? 'none' : '', 'paddingLeft': '0'}}>
                <li className="error-message">
                    * {props.validationErrors.length > 0 ? props.validationErrors[0] : ''}
                </li>
            </ul>

            <RegisterInputFields {...props} />

            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Register</button>
        </form>
    );
}

const RegisterInputFields = (registerProps: IRegisterProps) => {
    return(
        <>
            <RegisterInput id="Input_Email" name="email" type="email"
                           autoComplete="username" placeholder="name@example.com"
                           value={registerProps.values.email} label="Email"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterInput id="Input_Mobile" name="mobilePhone" type="text"
                           autoComplete="mobilephone" placeholder="53983030"
                           value={registerProps.values.mobilePhone} label="Mobile"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterInput id="Input_Password" name="password" type="password"
                           autoComplete="new-password" placeholder="password"
                           value={registerProps.values.password} label="Password"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterInput id="Input_ConfirmPassword" name="confirmPassword" type="password"
                           autoComplete="new-password" placeholder="password"
                           value={registerProps.values.confirmPassword} label="Confirm password"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterInput id="Input_FirstName" name="firstName" type="text"
                           autoComplete="firstname" placeholder="First name"
                           value={registerProps.values.firstName} label="First name"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterInput id="Input_LastName" name="lastName" type="text"
                           autoComplete="lastname" placeholder="LastName"
                           value={registerProps.values.lastName} label="Last name"
                           handleChange={(e) => registerProps.handleChange(e)} />
            <RegisterSelect
                name="country"
                label="Country"
                value={registerProps.values.country}
                handleChange={(e) => registerProps.handleChangeSelect(e)} />
            <RegisterCheckbox
                name="isTutor" label="Register as a tutor"
                checked={registerProps.values.isTutor}
                handleChange={(e) => registerProps.handleChange(e)} />
        </>
    )
}

const RegisterInput = (props: IRegisterInputProps) => {
    return (
        <div className="form-floating mb-3">
            <input
                onChange={(e) => props.handleChange(e.target)}
                value={props.value}
                className="form-control"
                autoComplete={props.autoComplete}
                aria-required="true"
                placeholder={props.placeholder}
                type={props.type}
                id={props.id}
                name={props.name}
                maxLength={props.maxLength}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
};

const RegisterCheckbox = (props: {
    name: string;
    label: string;
    checked: boolean;
    handleChange: (target: EventTarget & HTMLInputElement) => void;
}) => {
    return (
        <div className="form-check mb-3">
            <input
                className="form-check-input"
                type="checkbox"
                id={props.name}
                name={props.name}
                checked={props.checked}
                onChange={(e) => props.handleChange(e.target)}
            />
            <label className="form-check-label" htmlFor={props.name}>
                {props.label}
            </label>
        </div>
    );
};

const RegisterSelect = (props: {
    name: string;
    label: string;
    value: ECountries;
    handleChange: (target: EventTarget & HTMLSelectElement) => void;
}) => {
    const enumKeys = Object.keys(ECountries).filter((type) => isNaN(type as any) && type !== 'values');

    return (
        <div className="form-floating mb-3">
            <select
                className="form-select"
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={(e) => props.handleChange(e.target)}>
                {enumKeys.map((country, i) =>
                    <option value={country} key={i}>{country}</option>
                )}
            </select>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    );
};

export default RegisterView;