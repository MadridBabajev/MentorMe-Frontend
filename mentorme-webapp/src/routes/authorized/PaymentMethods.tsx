import {PaymentMethodsView} from "../route-views/PaymentMethodsView";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {PaymentMethodService} from "../../services/app-services/PaymentMethodService";
import {Loader} from "../../components/layout/Loader";
import {IPaymentMethodDetailed} from "../../types/dto/domain/profiles/IPaymentMethodDetailed";
import {INewPaymentMethod} from "../../types/dto/domain/profiles/INewPaymentMethod";
import {EPaymentCountry} from "../../types/dto/domain/enums/EPaymentCountry";
import {EPaymentMethodType} from "../../types/dto/domain/enums/EPaymentMethodType";
import {ValidatePaymentMethodInputs} from "../../services/helpers/validations/ValidatePaymentMethodInputs";
import {notificationManager} from "../../services/helpers/NotificationManager";
import {Notifications} from "../../types/strings/Notifications";
import {GetServicePaths} from "../../types/strings/GetServicePaths";

export const PaymentMethods = () => {

    const initialPaymentMethod: INewPaymentMethod = {
        details: "",
        cardCvv: "",
        cardExpirationDate: "",
        cardNumber: "",
        // ownerFullName: "",
        ownerCountry: EPaymentCountry.Estonia,
        paymentMethodType: EPaymentMethodType.InApp
    };

    const service = useMemo(() => new PaymentMethodService(), []);
    const [paymentMethods, setPaymentMethods] = useState<IPaymentMethodDetailed[] | undefined>(undefined);
    const [values, setValues] = useState<INewPaymentMethod | undefined>(initialPaymentMethod);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const fetchPaymentMethodsPath = GetServicePaths.PAYMENT_METHODS;

    const fetchData = useCallback( async () => {
        service.getAll(fetchPaymentMethodsPath).then(
            response => {
                setPaymentMethods(response || undefined);
            }
        );
    }, [service, fetchPaymentMethodsPath]);

    useEffect(() => {
        fetchData().catch(() => {
            console.error("Error occurred when fetching the payment method data")
        });
    }, [fetchData]);

    const handleRemove = (paymentMethodId: string) => {
        service.deletePaymentMethod(paymentMethodId).then(() => {
            fetchData().catch( () => {
                console.error("Error deleting a payment method")
            });
            notificationManager.showErrorNotification(Notifications.PAYMENT_METHOD_DELETED);
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const errors = ValidatePaymentMethodInputs(values);
        if (errors.length > 0) {
            setValidationErrors(errors);
            return;
        }
        if (values) {
            service.addPaymentMethod(values).then(() => {
                fetchData().catch(() => {
                    console.error("Error adding a payment method")
                });
                notificationManager
                    .showSuccessNotification(Notifications.PAYMENT_METHOD_ADDED);
                setValues(initialPaymentMethod);
            });
        } else {
            console.error("Error: values are undefined");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!values) {
            return;
        }

        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    if (!paymentMethods) {
        return <Loader />
    }

    return (
        <PaymentMethodsView
            paymentMethods={paymentMethods}
            handleRemove={handleRemove}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            validationErrors={validationErrors}/>
    )
}