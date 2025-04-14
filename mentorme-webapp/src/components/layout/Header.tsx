
import {useCallback, useContext, useEffect, useState} from "react";
import JwtContext from "../../types/context/JwtContext";
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout/header.css";
import logo from "../../assets/MentorMe-logo.png";
import inboxSvg from "../../assets/inbox-icon.svg";
import {IJwtPayload} from "../../types/dto/identity/IJwtPayload";
import {IdentityService} from "../../services/app-services/IdentityService";
import {LocalStorage} from "../../types/strings/LocalStorage";
import {Navigations} from "../../types/strings/Navigations";
import {UserTypes} from "../../types/strings/UserTypes";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState<string | null>(null);
    const { jwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();

    const handleStorageChange = useCallback(() => {
        let jwtToken = localStorage.getItem(LocalStorage.JWT);
        if (jwtToken) {
            setIsLoggedIn(true);
            let decodedJwtData;
            try {
                decodedJwtData = jwt_decode(jwtToken) as IJwtPayload;
            } catch (error) {
                console.error("Failed to decode JWT:" + error);
                setIsLoggedIn(false);
                setUserType(null);
                localStorage.clear()
                navigate(Navigations.LOGIN);
                return;
            }
            setUserType(decodedJwtData?.UserType || null);
        } else {
            setIsLoggedIn(false);
            setUserType(null);
        }
    }, [navigate]);

    useEffect(() => {
        // Initial check
        handleStorageChange();
        window.addEventListener('storage', handleStorageChange);
        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [jwtResponse, handleStorageChange]);

    return (
        <header className="navBar">
            <HeaderLogo isLoggedIn={isLoggedIn} />
            <HeaderLinks isLoggedIn={isLoggedIn} userType={userType} />
        </header>
    );
};


const HeaderLogo = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return(
        <Link to={isLoggedIn ? Navigations.PROFILE : "/"} className="mentormelogolamp">
            <img
                className="header-logo" alt="MentorMe logo"
                src={logo}
            />
        </Link>
    )
};

const HeaderLinks = ({ isLoggedIn, userType}: { isLoggedIn: boolean, userType: string | null}) => {
    const identityService = new IdentityService();
    const navigate = useNavigate();
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    const logout = async () => {

        if (jwtResponse) {
            try {
                const success = await identityService.logout({ refreshToken: jwtResponse.refreshToken });
                if (success) {
                    if (setJwtResponse) {
                        setJwtResponse(null);
                    }

                    localStorage.removeItem(LocalStorage.JWT);
                    localStorage.removeItem(LocalStorage.REFRESH_TOKEN);
                    localStorage.removeItem(LocalStorage.EXPIRY);
                    navigate("/");
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("Failed to logout:" + error);
            }
        }
    }

    return <HeaderLinksViews isLoggedIn={isLoggedIn} userType={userType} logout={logout} />
};

const HeaderLinksViews = ({isLoggedIn, userType, logout}: { isLoggedIn: boolean, userType: string | null, logout: () => void }) => {
    if (isLoggedIn) {
        return (
            <div className="right-nav-items">
                <Link to={Navigations.ML_FEATURES} className="right-nav-item">ML Features</Link>
                <Link to={Navigations.SUBJECTS} className="right-nav-item">Subjects</Link>
                {userType === UserTypes.STUDENT && <Link to={Navigations.TUTOR_SEARCH} className="right-nav-item">Tutors</Link>}
                <Link to={Navigations.MY_LESSONS} className="right-nav-item">My lessons</Link>
                {userType === UserTypes.TUTOR && <Link to={Navigations.MY_AVAILABILITY} className="right-nav-item">My availability</Link>}
                {userType === UserTypes.STUDENT && <Link to={Navigations.PAYMENT_METHODS} className="right-nav-item">Payment methods</Link>}
                {userType === UserTypes.TUTOR && <Link to={Navigations.BANKING_DETAILS} className="right-nav-item">Banking details</Link>}
                <Link to={Navigations.PROFILE} className="right-nav-item">My Profile</Link>
                <Link to={Navigations.INBOX} className="right-nav-item email-icon-container">
                    <img src={inboxSvg} className="email-icon" alt="inbox"/>
                </Link>
                <button onClick={logout} className="right-nav-item header-login-logout-btn">Logout</button>
            </div>
        );
    }

    return (
        <div className="right-nav-items">
            <Link to={Navigations.ML_FEATURES} className="right-nav-item">ML Features</Link>
            <Link to={Navigations.TUTOR_SEARCH} className="right-nav-item">Tutors</Link>
            <Link to={Navigations.SUBJECTS} className="right-nav-item">Subjects</Link>
            <Link to={Navigations.REGISTER} className="right-nav-item">Register</Link>
            <Link to={Navigations.LOGIN} className="right-nav-item header-login-logout-btn">Log in</Link>
        </div>
    )
};

export default Header;