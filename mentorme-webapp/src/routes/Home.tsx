import {Link} from "react-router-dom";
import IPricingColumnProps from "../types/props/IPricingColumnProps";

import "../styles/pages/home.css"
import schoolPricingIcon from "../assets/pricing-icons/pricing-school-icon.svg"
import universityPricingIcon from "../assets/pricing-icons/pricing-university-icon.svg"
import professionalPricingIcon from "../assets/pricing-icons/pricing-prof-icon.svg"

const Home = () => {
    return (
        <>
            <HomeLanding />
            <PricingSection />
        </>
    );
}

const HomeLanding = () => {
    return (
        <>
            <div className="subjectLanding">
                <div className="testContainer">
                    <HomeLandingText />
                    <HomeLandingButtons />
                </div>
            </div>
        </>
    )
}

const PricingSection = () => {
    return (
        <section style={{ padding: "4em 0em" }} id="pricingSection">
            <div>
                <div className="pricing-header">
                    <h2 className="mainH2">Average pricing Per Hour</h2>
                    <div className="greyH2">
            <span style={{ fontSize: "18px" }}>
              Request a tutor. Each tutor sets their own pricing.
            </span>
                    </div>
                </div>
                <PricingContainer />
            </div>
        </section>
    );
};

const PricingContainer = () => {
    return(
        <div className="pricing-container" style={{ margin: "3em 0em" }}>
            <PricingColumn
                imageSrc={schoolPricingIcon}
                className="schoolPricingIcon"
                title="School"
                description="Primary, Secondary & Higher"
                price="15€"
            />
            <PricingColumn
                imageSrc={universityPricingIcon}
                className="universityPricingIcon"
                title="University"
                description="Undergraduate & Postgraduate"
                price="20€"
            />
            <PricingColumn
                imageSrc={professionalPricingIcon}
                className="profPricingIcon"
                title="Professional"
                description="Chartered Qualifications, Admissions Tests"
                price="30€"
            />
        </div>
    )
}

const PricingColumn = ({imageSrc, className, title, description, price,}
                           : IPricingColumnProps) => {
    return (
        <div className="pricing-column">
            <img
                alt="great value icon"
                className={"pricing-image " + className}
                loading="lazy"
                src={imageSrc}
            />
            <div className="pricing-text">
                <h3 className="mainH3">{title}</h3>
                <div className="pBlack">{description}</div>
                <div className="greyH2">
                    <strong>
                        <span style={{ fontSize: "18px" }}>{`Prices start from ${price}/hr.`}</span>
                    </strong>
                </div>
            </div>
        </div>
    );
};


const HomeLandingButtons = () => {
    return (
        <>
            <div className="ui containerFrame findMeTutorButtons">
                <Link to="/tutors" className="button find-a-tutor-button">Find A Tutor</Link>
                <Link to="/register" className="inverted-button register-button" >Register</Link>
            </div>
        </>
    )
}

const HomeLandingText = () => {
    return (
        <>
            <div className="greyH2">
                <span>Your Time. Your Future. Make it Count.</span>
            </div>
            <h1 className="mainH1">MENTORME ONLINE TUTORS</h1>
            <div className="whiteH3">
                <span>MentorMe lets you schedule, record and pay for online classes with professional tutors. It's quick and easy.</span>
            </div>
        </>
    )
}

export default Home;
