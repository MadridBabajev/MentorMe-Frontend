import {BankingDetailsView} from "../route-views/BankingDetailsView";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ITutorBankingDetails} from "../../types/dto/domain/profiles/ITutorBankingDetails";
import {EBankAccountType} from "../../types/dto/domain/enums/EBankAccountType";
import {BankingDetailsService} from "../../services/app-services/BankingDetailsService";
import {ValidateBankingDetailsInputs} from "../../services/helpers/validations/ValidateBankingDetailsInputs";
import {notificationManager} from "../../services/helpers/NotificationManager";
import {Notifications} from "../../types/strings/Notifications";
import {GetServicePaths} from "../../types/strings/GetServicePaths";

export const BankingDetails = () => {
    const updatedBankingDetailsInitial: ITutorBankingDetails = {
        bankAccountName: "",
        bankAccountNumber: "",
        bankAccountType: EBankAccountType.Personal
    };

    const service = useMemo(() => new BankingDetailsService(), []);
    const [currentBankingDetails, setCurrentBankingDetails] = useState<ITutorBankingDetails | undefined>(undefined);
    const [updatedBankingDetails, setUpdatedBankingDetails] = useState<ITutorBankingDetails>(updatedBankingDetailsInitial);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [show, setShow] = useState(false);
    const fetchPaymentMethodsPath = GetServicePaths.BANKING_DETAILS;

    const updateBankingDetailsInitial = useCallback((data: ITutorBankingDetails) => {
        setUpdatedBankingDetails({
            ...data,
        });
    }, []);

    const fetchData = useCallback(async () => {
        service.findOneById(fetchPaymentMethodsPath).then(
            response => {
                setCurrentBankingDetails(response || undefined);
                if (response) updateBankingDetailsInitial(response);
            }
        );
    }, [service, updateBankingDetailsInitial, fetchPaymentMethodsPath]);

    useEffect(() => {
        fetchData().catch(() => {
            console.error("Error occurred when fetching the banking details")
        });
    }, [service, fetchData]);

    const handleEdit = () => {
        setIsEditable(true);
    }

    const handleCancel = () => {
        setIsEditable(false);
        updateBankingDetailsInitial(currentBankingDetails!);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(updatedBankingDetails)
        const errors = ValidateBankingDetailsInputs(updatedBankingDetails);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        if (updatedBankingDetails) {
            handleShow();
        }
    };

    const handleConfirmSubmit = () => {
        if (updatedBankingDetails) {
            service.updateBankingDetails(updatedBankingDetails).then(() => {
                fetchData().catch(() => {
                    console.error("Error updating banking details");
                });
                notificationManager
                    .showSuccessNotification(Notifications.BANKING_DETAILS_UPDATED);

                setIsEditable(false);
                handleClose();
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!updatedBankingDetails) {
            return;
        }

        setValidationErrors([]);

        setUpdatedBankingDetails({
            ...updatedBankingDetails,
            [event.target.name]: event.target.value
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <BankingDetailsView
            currentBankingDetails={currentBankingDetails}
            updatedBankingDetails={updatedBankingDetails}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleClose={handleClose}
            handleShow={handleShow}
            handleConfirmSubmit={handleConfirmSubmit}
            show={show}
            isEditable={isEditable}
            validationErrors={validationErrors} />
    )
}