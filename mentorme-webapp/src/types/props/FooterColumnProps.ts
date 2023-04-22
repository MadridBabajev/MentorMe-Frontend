
export interface IFooterLink {
    path: string;
    className: string;
    text: string;
}

export interface FooterColumnProps {
    header: string;
    links: IFooterLink[];
}
