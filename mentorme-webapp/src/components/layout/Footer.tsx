import { Link } from "react-router-dom";
import {IFooterColumnProps, IFooterLink} from "../../types/props/layout/IFooterColumnProps";
import "../../styles/layout/footer.css";

// TODO: Fix footer links!
const Footer = () => {

    const servicesLinks: IFooterLink[] = [
        { path: "/", className: "", text: "Online Tutors" },
        { path: "/", className: "", text: "Our Subjects" },
        { path: "/", className: "", text: "How it works" },
        { path: "/", className: "", text: "FAQs" },
    ];

    const companyLinks: IFooterLink[] = [
        { path: "/", className: "", text: "About us" },
        { path: "/", className: "", text: "Privacy" },
        { path: "/", className: "", text: "Facebook" },
        { path: "/", className: "", text: "Instagram" },
    ];

    return (
        <footer>
            <div className="footer-columns">
                <FooterColumn header="Our Services" links={servicesLinks} />
                <FooterColumn header="Our Company" links={companyLinks} />
            </div>
            <FooterCopyright />
        </footer>
    );
};

const FooterColumn = ({header, links}: IFooterColumnProps) => {

    return (
        <div className="footer-column">
            <div className="footer-header">{header}</div>
            <div>
                {links.map((link, index) => (
                    <Link key={index} to={link.path} className={link.className}>
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

const FooterCopyright = () => {
    return (
        <div className="footer-copyright">
            <div>
                <p>
                    Company No xxxxxxxxx
                    <br />
                    Registered In Estonia
                    <br />
                    VAT Number: xxxxxxxxx
                </p>
                <p>&copy; SOTC Limited 2023</p>
            </div>
        </div>
    )
}

export default Footer;