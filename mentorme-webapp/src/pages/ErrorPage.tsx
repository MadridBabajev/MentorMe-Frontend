import { useRouteError } from "react-router-dom";
import { IError } from "../types/errors/IError"
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ErrorPage = () => {
    const error = useRouteError() as IError;
    console.error(error);

    return (
        <>
            <Header />
            <div id="error-page" className="error-page-content">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="error-message">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <Footer />
        </>
    );
}

export default ErrorPage;