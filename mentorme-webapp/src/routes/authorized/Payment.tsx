import {useParams} from "react-router-dom";
import {LessonDataService} from "../../services/app-services/LessonDataService";

const Payment = () => {
    const { paymentId } = useParams();
    // const paymentsService = new PaymentsService();

    return (
        <div>
            Payment page: {paymentId}
        </div>
    );
};

export default Payment;