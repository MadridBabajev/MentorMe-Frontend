
import { RegisterProps } from "../../types/props/RegisterProps";
import {RegisterInputProps} from "../../types/props/RegisterInputProps";
import React from "react";

const RegisterView = (props: RegisterProps) => {

    return (
        <form>
            <h2 className="mainH1" style={{marginTop: "200px"}}>Become a user</h2>
            <hr />

            <ul style={{'display': props.validationErrors.length == 0 ? 'none' : ''}}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ''}</li>
            </ul>

            <RegisterInputFields {...props} />

            <button
                onClick={(e) => props.onSubmit(e)}
                id="registerSubmit" className="w-100 btn btn-lg btn-primary">Register</button>
        </form>
    );
}

const RegisterInputFields = (registerProps: RegisterProps) => {
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
            <RegisterCheckbox
                name="isTutor" label="Register as a tutor"
                checked={registerProps.values.isTutor}
                handleChange={(e) => registerProps.handleChange(e)} />
        </>
    )
}

const RegisterInput = (props: RegisterInputProps) => {
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

export default RegisterView;