
export interface IFooterLink {
    path: string;
    className: string;
    text: string;
}

export interface IFooterColumnProps {
    header: string;
    links: IFooterLink[];
}
