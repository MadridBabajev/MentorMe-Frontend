import {IPaymentMethodsViewProps} from "../../types/props/payment-methods/IPaymentMethodsViewProps";
import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {IPaymentMethodCardProps} from "../../types/props/payment-methods/IPaymentMethodCardProps";
import "../../styles/pages/payment-methods.css"
import {EPaymentCountry} from "../../types/dto/domain/enums/EPaymentCountry";
import {EPaymentMethodType} from "../../types/dto/domain/enums/EPaymentMethodType";
import {IPaymentMethodFormProps} from "../../types/props/payment-methods/IPaymentMethodFormProps";

const paymentMethodTextMap: Record<EPaymentMethodType, string> = {
    [EPaymentMethodType.InApp]: 'In App',
    [EPaymentMethodType.Cash]: 'Cash',
    [EPaymentMethodType.Other]: 'Other'
};

const countryTextMap: Record<EPaymentCountry, string> = {
    [EPaymentCountry.Estonia]: 'Estonia',
    [EPaymentCountry.Latvia]: 'Latvia',
    [EPaymentCountry.Lithuania]: 'Lithuania'
};
export const PaymentMethodsView = (props: IPaymentMethodsViewProps) => {

    return (
        <div>
            <h3 style={{textAlign: "center", marginTop: "180px"}} className="mb-4 mainH1">Payment Methods</h3>
            <div className="payment-method-form-container">
                <PaymentMethodForm {...props} />
            </div>
            <div className="payment-methods-container">
                {props.paymentMethods.map(pm => (
                    <PaymentMethodCard paymentMethod={pm} onRemove={props.handleRemove} key={pm.id} />
                ))}
            </div>
        </div>
    )
}

const PaymentMethodForm = (props: IPaymentMethodFormProps) => {
    const { values, handleChange, handleSubmit, validationErrors } = props;

    return (
        <div className="filter-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Details' name="details" value={values?.details || ""} onChange={handleChange} />
                <input type="text" placeholder='Card CVV' name="cardCvv" value={values?.cardCvv || ""} onChange={handleChange} />
                <input type="text" placeholder='Card Expiration Date' name="cardExpirationDate" value={values?.cardExpirationDate || ""} onChange={handleChange} />
                <input type="text" placeholder='Card Number' name="cardNumber" value={values?.cardNumber || ""} onChange={handleChange} />
                <button type='submit'>Submit</button>
            </form>
            {validationErrors && validationErrors.length > 0 && (
                <ErrorMessage errors={validationErrors} />
            )}
        </div>
    )
}

const ErrorMessage = ({ errors }: { errors: string[] }) => (
    <div className="error-message">
        {errors.map((error, i) => (
            <div key={i}>{error}</div>
        ))}
    </div>
)

const PaymentMethodCard = ({ paymentMethod, onRemove }: IPaymentMethodCardProps) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = () => {
        handleClose();
        onRemove(paymentMethod.id!);
    };

    return (
        <div className="payment-method-card rounded bg-white d-flex justify-content-between">
            <div className="payment-method-card-left">
                <h4 className="payment-method-card-name">Card Number: {paymentMethod.cardNumber}</h4>
                <div className="mt-1 payment-method-card-expiration simple-text">Expiration Date: <strong>{paymentMethod.cardExpirationDate}</strong></div>
                <div className="payment-method-card-details simple-text">Card Details: <strong>{paymentMethod.details}</strong></div>
            </div>
            <div className="payment-method-card-right">
                <div className="payment-method-card-owner simple-text">Owner Name: <strong>{paymentMethod.ownerFullName}</strong></div>
                <div className="payment-method-card-type simple-text">Payment Method Type: <strong>{paymentMethodTextMap[paymentMethod.paymentMethodType]}</strong></div>
                <div className="payment-method-card-country simple-text">Owner Country: <strong>{countryTextMap[paymentMethod.ownerCountry]}</strong></div>
            </div>
            <div className="payment-method-card-header d-flex justify-content-end">
                <button className="cross-button payment-method-remove-button" onClick={handleShow}>×</button>
            </div>
            <div className="payment-method-card-blocked">Blocked:
                {(paymentMethod.isBlocked === null || paymentMethod.isBlocked === undefined) ? " N/A" : paymentMethod.isBlocked!.toString()}</div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm payment method removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this payment method?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};