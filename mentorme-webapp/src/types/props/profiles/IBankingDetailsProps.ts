import React from "react";
import {ITutorBankingDetails} from "../../dto/domain/profiles/ITutorBankingDetails";

export interface IBankingDetailsProps {
    currentBankingDetails: ITutorBankingDetails | undefined;
    updatedBankingDetails: ITutorBankingDetails;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    handleEdit: () => void;
    handleCancel: () => void;
    handleClose: () => void;
    handleShow: () => void;
    handleConfirmSubmit: () => void;
    show: boolean;
    isEditable: boolean;
    validationErrors: string[];
}