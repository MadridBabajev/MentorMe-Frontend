import {IPayment} from "../../types/dto/domain/lessons/IPayment";
import {EPaymentMethodType} from "../../types/dto/domain/enums/EPaymentMethodType";
import {EPaymentStatus} from "../../types/dto/domain/enums/EPaymentStatus";
import "../../styles/pages/payment.css"

const paymentMethodTypes = {
    [EPaymentMethodType.InApp]: 'In App',
    [EPaymentMethodType.Cash]: 'Cash',
    [EPaymentMethodType.Other]: 'Other',
};

const paymentStatusColors = {
    [EPaymentStatus.Reserved]: 'blue',
    [EPaymentStatus.Refunded]: 'purple',
    [EPaymentStatus.Resolved]: 'green',
    [EPaymentStatus.Failed]: 'red',
};

export const PaymentView = ({ payment }: { payment: IPayment }) => {
    return (
        <div className="payment-container">
            <h1 style={{textAlign: "center"}} className="mb-5 mainH1">Payment Details</h1>

            <div className="payment-card">
                <div className="column">
                    <div className="detail-row">
                        <h2 className="greyH2">Date:</h2>
                        <div className="simple-text">{new Date(payment.date).toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <div className="detail-row">
                        <h2 className="greyH2">Sender:</h2>
                        <div className="simple-text">{payment.senderStudentFullName}</div>
                    </div>
                    <div className="detail-row">
                        <h2 className="greyH2">Payment Status:</h2>
                        <div className="simple-text" style={{ color: paymentStatusColors[payment.paymentStatus], fontWeight: "bold" }}>{EPaymentStatus[payment.paymentStatus]}</div>
                    </div>
                    <div className="detail-row">
                        <h2 className="greyH2">Additional Fees:</h2>
                        <div className="simple-text">{payment.additionalFees ? payment.additionalFees.toFixed(2) : "N/A "}€</div>
                    </div>
                </div>

                <div className="column">
                    <div className="detail-row">
                        <h2 className="greyH2">Amount:</h2>
                        <div className="simple-text">{payment.amount.toFixed(2)}€</div>
                    </div>
                    <div className="detail-row">
                        <h2 className="greyH2">Recipient:</h2>
                        <div className="simple-text">{payment.recipientTutorFullName}</div>
                    </div>
                    <div className="detail-row">
                        <h2 className="greyH2">Payment Method:</h2>
                        <div className="simple-text">{paymentMethodTypes[payment.paymentMethodType]}</div>
                    </div>
                    <div className="description-row">
                        <h2 style={{fontWeight: "500"}} className="greyH2">Description:</h2>
                        <div className="description-text">{payment.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentView;