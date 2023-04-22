
import {useContext} from "react";
import JwtContext from "../../types/context/JwtContext";
import { Link } from "react-router-dom";
import "../../styles/layout/header.css";
import logo from "../../assets/MentorMe-logo.png"; // Import the logo


const Header = () => {

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    return (
            <header className="navBar">
                <HeaderLogo />
                <HeaderLinks />
            </header>
    );
}

const HeaderLogo = () => {
    return(
        <Link to="/" className="mentormelogolamp">
            <img
                className="header-logo" alt="MentorMe logo"
                src={logo}
            />
        </Link>
    )
}

const HeaderLinks = () => {

    return(
        <div className="right-nav-items">
            <Link to="/tutors" className="right-nav-item">Tutors</Link>
            <Link to="/subjects" className="right-nav-item">Subjects</Link>
            <Link to="/register" className="right-nav-item">Register</Link>
            <Link to="/login" className="right-nav-item header-login-btn">Log in</Link>
            {/* TODO: Mobile dropdown */}
            {/*<div className="ui dropdown mobilelink mobilelink-dropdown"*/}
            {/*     style={{ background: "none", marginRight: "0.5em" }}>*/}
            {/*    <div className="item dropbtn"><i className="sidebar icon dropbtn"></i></div>*/}
            {/*    <div id="menu-dropdown" className="menu dropdown-content" style={{ display: "none" }}>*/}
            {/*        <Link className="item" to="/tutors"><span className="navbar">Tutors</span></Link>*/}
            {/*        <Link className="item" to="/subjects"><span className="navbar">Subjects</span></Link>*/}
            {/*        <Link className="item" to="/pricing-and-plans"><span className="navbar">Register</span></Link>*/}
            {/*        <Link className="item" to="/online-tutoring-jobs"><span className="navbar">Log in</span></Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Header;