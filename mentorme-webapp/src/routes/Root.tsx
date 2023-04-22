import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import IJWTResponse from "../types/dto/IJWTResponse";
import JwtContext from "../types/context/JwtContext";

const Root = () => {

    const [jwtResponse, setJwtResponse] = useState(null as IJWTResponse | null);

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