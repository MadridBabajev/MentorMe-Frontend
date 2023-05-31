import {IUpdatedProfileData} from "../../dto/domain/profiles/IUpdatedProfileData";
import React from "react";

export interface IEditProfileViewProps {
    currentProfileData: IUpdatedProfileData | undefined;
    updatedProfileData: IUpdatedProfileData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleRateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => Promise<void>;
    handleEdit: () => void;
    handleCancel: () => void;
    handleClose: () => void;
    handleShow: () => void;
    handleConfirmSubmit: () => void;
    show: boolean;
    isEditable: boolean;
    validationErrors: string[];
}