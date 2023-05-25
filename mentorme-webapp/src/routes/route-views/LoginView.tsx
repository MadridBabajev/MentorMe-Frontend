
import { ILoginProps } from "../../types/props/authorization/ILoginProps";
import React from "react";
import {IRegisterInputProps} from "../../types/props/authorization/IRegisterInputProps";

const LoginView = (props: ILoginProps) => {

    return (
        <form>
            <h2 className="mainH1" style={{marginTop: "200px"}}>Login</h2>
            <hr />

            <ul style={{'display': props.validationErrors.length === 0 ? 'none' : '', 'paddingLeft': '0'}}>
                <li className="error-message">
                    * {props.validationErrors.length > 0 ? props.validationErrors[0] : ''}
                </li>
            </ul>

            <LoginInputFields {...props} />

            <button
                onClick={(e) => props.onSubmit(e)}
                id="loginSubmit" className="w-100 btn btn-lg btn-primary">Login</button>
        </form>
    );
}

const LoginInputFields = (loginProps: ILoginProps) => {
    return (
        <>
            <LoginInput id="Input_Email" name="email" type="email"
                        autoComplete="username" placeholder="name@example.com"
                        value={loginProps.values.email} label="Email"
                        handleChange={(e) => loginProps.handleChange(e)}/>
            <LoginInput id="Input_Password" name="password" type="password"
                        autoComplete="current-password" placeholder="password"
                        value={loginProps.values.password} label="Password"
                        handleChange={(e) => loginProps.handleChange(e)}/>
            <LoginCheckbox
                name="isTutor" label="Login as a tutor"
                checked={loginProps.values.isTutor}
                handleChange={(e) => loginProps.handleChange(e)} />

        </>
    )
}

const LoginInput = (props: IRegisterInputProps) => {
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

const LoginCheckbox = (props: {
    name: string;
    label: string;
    checked: boolean;
    handleChange: (target: EventTarget & HTMLInputElement) => void; }) => {
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

export default LoginView;