import {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import IJWTResponse from "../types/dto/identity/IJWTResponse";
import JwtContext from "../types/context/JwtContext";
import "../styles/site.css"
import {JwtRefreshEvent} from "../services/base-services/BaseService";

const Root = () => {

    const [jwtResponse, setJwtResponse] = useState(null as IJWTResponse | null);
    console.log('Set JwtResponse:', jwtResponse);

    useEffect(() => {
        const listener = (newJwtResponse: IJWTResponse) => {
            setJwtResponse(newJwtResponse);
        };

        JwtRefreshEvent.on('refresh', listener);

        return () => {
            JwtRefreshEvent.off('refresh', listener);
        };
    }, []);

    return (
        <JwtContext.Provider value={{ jwtResponse, setJwtResponse }}>
            <Header />

            <div className="container">
                <main style={{marginTop: "160px" }} role="main" className="pb-3">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </JwtContext.Provider>
    );
}

export default Root;