import {IBankingDetailsProps} from "../../types/props/profiles/IBankingDetailsProps";
import {ReactComponent as PencilIcon} from '../../assets/pencil-icon.svg';
import { FaCheck as TickIcon, FaTimes as CrossIcon } from 'react-icons/fa';
import "../../styles/pages/banking-details.css"
import {Button, Modal} from "react-bootstrap";
import {EBankAccountType} from "../../types/dto/domain/enums/EBankAccountType";
import React from "react";
export const BankingDetailsView = (props: IBankingDetailsProps) => {
    const { isEditable, handleEdit, handleCancel, handleChange, handleSubmit, currentBankingDetails, updatedBankingDetails } = props;

    return (
        <div style={{marginTop: "180px", marginBottom: "120px"}} className="banking-details-container">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update the banking details?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleConfirmSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className="greyH2 mb-3">Banking Details</h2>
            {isEditable ? (
                <form onSubmit={handleSubmit}>
                    <div className="banking-details-actions">
                        <TickIcon className="submit-icon" type="submit" onClick={handleSubmit} />
                        <CrossIcon className="cancel-icon" onClick={handleCancel} />
                    </div>
                    <div>
                        <label className="simple-text">Bank Account Name: </label>
                        <input
                            className="banking-details-input"
                            type="text"
                            name="bankAccountName"
                            value={updatedBankingDetails.bankAccountName}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className="simple-text">Bank Account Number: </label>
                        <input
                            className="banking-details-input"
                            type="text"
                            name="bankAccountNumber"
                            value={updatedBankingDetails.bankAccountNumber}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className="simple-text">Bank Account Type: </label>
                        <select
                            className="banking-details-input"
                            name="bankAccountType"
                            value={updatedBankingDetails.bankAccountType}
                            onChange={handleChange}
                        >
                            <option value={EBankAccountType.Personal}>{EBankAccountType[EBankAccountType.Personal]}</option>
                            <option value={EBankAccountType.Business}>{EBankAccountType[EBankAccountType.Business]}</option>
                        </select>
                    </div>
                    <div>
                        <div><span className="simple-text">Is Validated: </span>
                            <span className="banking-details-validated">Yes</span></div>
                    </div>
                    {props.validationErrors && props.validationErrors.length > 0 && (
                        <ErrorMessage errors={props.validationErrors} />
                    )}
                </form>
            ) : (
                <>
                    <div className="banking-details-actions edit-button-banking-d" onClick={handleEdit}>
                    <PencilIcon className="edit-icon" />
                </div>
                    <div className="d-flex flex-row">
                        <label className="simple-text">Bank Account Name: </label>
                        <div className="banking-details-text">{currentBankingDetails?.bankAccountName}</div>
                    </div>
                    <div className="d-flex flex-row">
                        <label className="simple-text">Bank Account Number: </label>
                        <div className="banking-details-text">{currentBankingDetails?.bankAccountNumber}</div>
                    </div>
                    <div className="d-flex flex-row">
                        <label className="simple-text">Bank Account Type: </label>
                        <div className="banking-details-text">
                            {EBankAccountType[updatedBankingDetails.bankAccountType]}</div>
                    </div>
                    <div>
                        <div><span className="simple-text">Is Validated: </span>
                            <span className="banking-details-validated">Yes</span></div>
                    </div>
                </>
            )}
        </div>
    );
};

const ErrorMessage = ({ errors }: { errors: string[] }) => (
    <div className="error-message">
        {errors.map((error, i) => (
            <div key={i}>{error}</div>
        ))}
    </div>
)
