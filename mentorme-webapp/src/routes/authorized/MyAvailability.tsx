import {AvailabilityFormView, MyAvailabilityView} from "../route-views/MyAvailabilityView";
import {INewAvailability} from "../../types/dto/domain/profiles/INewAvailability";
import {EDayOfTheWeek} from "../../types/dto/domain/enums/EDayOfTheWeek";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {AvailabilityService} from "../../services/app-services/AvailabilityService";
import {IAvailability} from "../../types/dto/domain/profiles/IAvailability";
import {Loader} from "../../components/layout/Loader";
import {IAvailabilityFormProps} from "../../types/props/availabilities/IAvailabilityFormProps";
import {notificationManager} from "../../services/helpers/NotificationManager";
import {Notifications} from "../../types/strings/Notifications";
import {GetServicePaths} from "../../types/strings/GetServicePaths";
import {ValidationErrors} from "../../types/strings/ValidationErrors";

export const MyAvailability = () => {
    const initialAvailability: INewAvailability = {
        dayOfTheWeek: EDayOfTheWeek.Monday,
        fromHours: "",
        toHours: ""
    };

    const service = useMemo(() => new AvailabilityService(), []);
    const [availabilities, setAvailabilities] = useState<IAvailability[] | undefined>(undefined);
    const [values, setValues] = useState<INewAvailability | undefined>(initialAvailability);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const fetchAvailabilitiesPath = GetServicePaths.ALL_AVAILABILITIES;

    const fetchData = useCallback(async () => {
        service.getAll(fetchAvailabilitiesPath).then(
            response => {
                setAvailabilities(response || undefined);
            }
        );
    }, [service, fetchAvailabilitiesPath]);

    useEffect(() => {
        fetchData().catch(() => {
            console.error("Error occurred when fetching the availability data")
        });
    }, [fetchData]);

    const handleRemove = (availabilityId: string) => {
        service.deleteAvailability(availabilityId).then(() => {
            fetchData().catch( () => {
                console.error("Error deleting an availability")
            });

            notificationManager.showErrorNotification(Notifications.AVAILABILITY_DELETED);
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let newValidationErrors: string[] = [];

        if (!values?.fromHours || !values?.toHours) {
            newValidationErrors.push(ValidationErrors.AVAILABILITY_UNSELECTED);
        }

        setValidationErrors(newValidationErrors);

        if (newValidationErrors.length > 0) return;

        if (values) {
            service.addAvailability(values).then(() => {
                fetchData().catch(() => {
                    console.error("Error adding an availability")
                });
                notificationManager.showSuccessNotification(Notifications.AVAILABILITY_ADDED);

                setValues(initialAvailability);
                setValidationErrors([]);
            });
        } else {
            console.error("Error: values are undefined");
        }
    };

    const handleChange = (name: keyof INewAvailability, value: string | EDayOfTheWeek) => {
        if (!values) {
            return;
        }

        setValues({
            ...values,
            [name]: value
        });
    };

    if (!availabilities) {
        return <Loader />
    }

    return (
        <MyAvailabilityView
            availabilities={availabilities}
            handleRemove={handleRemove}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
        />
    )
}

export const AvailabilityForm = (props: IAvailabilityFormProps) => {

    const hourOptions = Array.from({ length: 24 }, (v, i) => i)
        .map(i => ({ value: `${i < 10 ? '0' : ''}${i}:00`, label: `${i < 10 ? '0' : ''}${i}:00` }));

    const handleDayChange = (day: EDayOfTheWeek) => {
        props.handleChange('dayOfTheWeek', day);
    };

    const handleFromHourChange = (option: {value: string, label: string} | null) => {
        if (option) {
            props.handleChange('fromHours', option.value);
        }
    };

    const handleToHourChange = (option: {value: string, label: string} | null) => {
        if (option) {
            const fromHoursValue = parseInt(props.values?.fromHours.split(':')[0] || "0");
            const toHoursValue = parseInt(option.value.split(':')[0]);

            if(toHoursValue <= fromHoursValue) {
                props.setValidationErrors([ValidationErrors.AVAILABILITY_INVALID]);
                return;
            } else {
                props.setValidationErrors([]);
            }

            props.handleChange('toHours', option.value);
        }
    };

    return (
        <AvailabilityFormView
            hourOptions={hourOptions}
            values={props.values}
            handleDayChange={handleDayChange}
            handleFromHourChange={handleFromHourChange}
            handleToHourChange={handleToHourChange}
            handleSubmit={props.handleSubmit}
            validationErrors={props.validationErrors}
        />
    );
}
