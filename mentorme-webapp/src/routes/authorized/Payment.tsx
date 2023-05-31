import {useParams} from "react-router-dom";
import {PaymentsService} from "../../services/app-services/PaymentsService";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {IPayment} from "../../types/dto/domain/lessons/IPayment";
import {Loader} from "../../components/layout/Loader";
import PaymentView from "../route-views/PaymentView";
import {GetServicePaths} from "../../types/strings/GetServicePaths";

const Payment = () => {
    const { paymentId } = useParams();
    const paymentsService = useMemo( () => new PaymentsService(), []);
    const [payment, setPayment] = useState<IPayment | undefined>(undefined);
    const getPaymentPath = `${GetServicePaths.PAYMENT}/${paymentId}`;

    const fetchPayment = useCallback( async () => {
        const response = await paymentsService.findOneById(getPaymentPath);
        if (response) {
            setPayment(response);
        }
    }, [getPaymentPath, paymentsService]);

    useEffect(() => {
        fetchPayment().catch( () => {
            console.error("Failed to fetch the payment")
        });
    }, [fetchPayment]);

    if (!payment) {
        return <Loader />
    }

    return (
        <PaymentView payment={payment} />
    );
};

export default Payment;