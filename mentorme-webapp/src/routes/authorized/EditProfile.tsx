import {EditProfileView} from "../route-views/EditProfileView";
import {IUpdatedProfileData} from "../../types/dto/domain/profiles/IUpdatedProfileData";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {EditProfileService} from "../../services/app-services/EditProfileService";
import {GetServicePaths} from "../../types/strings/GetServicePaths";
import {ValidateProfileInputs} from "../../services/helpers/validations/ValidateProfileInputs";
import {notificationManager} from "../../services/helpers/NotificationManager";
import {Notifications} from "../../types/strings/Notifications";

export const EditProfile = () => {
    const updatedProfileDataInitial: IUpdatedProfileData = {
        id: "",
        firstName: "",
        lastName: "",
        mobilePhone: "",
        title: "",
        bio: "",
        userType: "",
        profilePicture: null,
        hourlyRate: null,
    };

    const service = useMemo(() => new EditProfileService(), []);
    const [currentProfileData, setCurrentProfileData] = useState<IUpdatedProfileData | undefined>(undefined);
    const [updatedProfileData, setUpdatedProfileData] = useState<IUpdatedProfileData>(updatedProfileDataInitial);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [show, setShow] = useState(false);
    const fetchProfileDataPath = GetServicePaths.EDIT_PROFILE_DATA;

    const updateProfileDataInitial = useCallback((data: IUpdatedProfileData) => {
        setUpdatedProfileData({
            ...data,
        });
    }, []);

    const fetchData = useCallback(async () => {
        service.findOneById(fetchProfileDataPath).then(
            response => {
                setCurrentProfileData(response || undefined);
                if (response) updateProfileDataInitial(response);
            }
        );
    }, [service, updateProfileDataInitial, fetchProfileDataPath]);

    useEffect(() => {
        fetchData().catch(() => {
            console.error("Error occurred when fetching the profile data")
        });
    }, [service, fetchData]);

    const handleEdit = () => {
        setIsEditable(true);
    }

    const handleCancel = () => {
        setIsEditable(false);
        updateProfileDataInitial(currentProfileData!);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const errors = ValidateProfileInputs(updatedProfileData);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        if (updatedProfileData) {
            handleShow();
        }
    };

    const handleConfirmSubmit = () => {
        if (updatedProfileData) {
            service.updateProfileData(updatedProfileData).then(() => {
                fetchData().catch(() => {
                    console.error("Error updating profile data");
                });
                notificationManager
                    .showSuccessNotification(Notifications.PROFILE_DETAILS_UPDATED);

                setIsEditable(false);
                handleClose();
            });
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (!updatedProfileData) {
            return;
        }

        setValidationErrors([]);

        if (event.target.type === "file") {
            const input = event.target as HTMLInputElement;
            const file = input.files?.[0];

            if (file) {
                const fileExtension = file.name.split('.').pop()?.toLowerCase();

                if (fileExtension === 'jpg' || fileExtension === 'png') {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const arrayBuffer = e.target!.result as ArrayBuffer;
                        let binary = '';
                        const bytes = new Uint8Array(arrayBuffer);
                        bytes.forEach((byte) => binary += String.fromCharCode(byte));
                        const base64String = window.btoa(binary);
                        setUpdatedProfileData({
                            ...updatedProfileData,
                            profilePicture: base64String
                        });
                        notificationManager.showSuccessNotification(Notifications.UPLOADED_IMG);
                    }
                    reader.readAsArrayBuffer(file);
                } else {
                    notificationManager.showErrorNotification(Notifications.INVALID_IMG_FORMAT);
                }
            }
        } else {
            setUpdatedProfileData({
                ...updatedProfileData,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!updatedProfileData) {
            return;
        }

        setValidationErrors([]);

        setUpdatedProfileData({
            ...updatedProfileData,
            hourlyRate: Number(event.target.value)
        });
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <EditProfileView
            currentProfileData={currentProfileData}
            updatedProfileData={updatedProfileData}
            handleChange={handleChange}
            handleRateChange={handleRateChange}
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