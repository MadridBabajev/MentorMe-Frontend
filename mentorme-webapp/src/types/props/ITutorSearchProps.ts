import {ITutorSearch} from "../dto/domain/ITutorSearch";
import {ITutorFilterProps} from "./ITutorFilterProps";
import {ISubjectFilterElement} from "../dto/domain/ISubjectFilterElement";
import React, {ChangeEvent} from "react";

export interface ITutorSearchProps {
    filters: ITutorFilterProps;
    subjects: ISubjectFilterElement[];
    tutors: ITutorSearch[];
    setTutors: React.Dispatch<React.SetStateAction<ITutorSearch[]>>;
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (subjectId: string, isChecked: boolean) => void;
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleFilterButtonClick: () => void
}