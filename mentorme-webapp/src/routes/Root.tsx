import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import IJWTResponse from "../types/dto/identity/IJWTResponse";
import JwtContext from "../types/context/JwtContext";
import "../styles/site.css"
import {JwtRefreshEvent} from "../services/base-services/BaseService";
import {notificationManager} from "../services/helpers/NotificationManager";
import NotificationPopup from "../components/layout/NotificationPopup";
import {INotification} from "../types/props/layout/INotification";
import {RefreshEvents} from "../types/strings/RefreshEvents";

const Root = () => {

    const [jwtResponse, setJwtResponse] = useState(null as IJWTResponse | null);
    const [notification, setNotification] = useState<INotification>({ message: '', color: '' });

    useEffect(() => {
        notificationManager.setNotificationCallback(setNotification);
    }, []);

    useEffect(() => {
        const listener = (newJwtResponse: IJWTResponse) => {
            setJwtResponse(newJwtResponse);
        };

        JwtRefreshEvent.on(RefreshEvents.JWT_REFRESH_EVENT, listener);

        return () => {
            JwtRefreshEvent.off(RefreshEvents.JWT_REFRESH_EVENT, listener);
        };
    }, []);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            <Header />

            <div className="container">
                <main style={{ marginTop: "160px" }} role="main" className="pb-3">
                    <Outlet />
                </main>
            </div>

            <NotificationPopup notification={notification} setNotification={setNotification} />
            <Footer />

        </JwtContext.Provider>
    );
}

export default Root;
