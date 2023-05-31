import {ISubjectDetails} from "../../dto/domain/subjects/ISubjectDetails";

export interface ISubjectDetailsViewProps {
    subject: ISubjectDetails | undefined;
    imageSrc: string | undefined;
    handleSubjectAddRemove: () => Promise<void>;
}