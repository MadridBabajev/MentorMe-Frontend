import React, {useCallback, useContext, useEffect, useState} from "react";
import {ITutorSearch} from "../types/dto/domain/profiles/ITutorSearch";
import {ISubjectFilterElement} from "../types/dto/domain/subjects/ISubjectFilterElement";
import JwtContext from "../types/context/JwtContext";
import {useNavigate} from "react-router-dom";
import {TutorsSearchService} from "../services/app-services/TutorsSearchService";
import {SubjectsFilterService} from "../services/app-services/SubjectsFilterService";
import {CheckAndDecodeJWT} from "../services/helpers/CheckAndDecodeJWT";
import {ITutorFilterProps} from "../types/props/profiles/ITutorFilterProps";
import {TutorsSearchViews} from "./route-views/TutorsSearchViews";
import {Loader} from "../components/layout/Loader";
import "../styles/pages/tutors-search.css";

const TutorsSearch = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();

    const [tutors, setTutors] = useState<ITutorSearch[]>([]);
    const [subjects, setSubjects] = useState<ISubjectFilterElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ITutorFilterProps>({
        firstName: null,
        lastName: null,
        minClassesCount: null,
        maxClassesCount: null,
        minHourlyRate: null,
        maxHourlyRate: null,
        minAverageRating: null,
        maxAverageRating: null,
        subjectIds: []
    });

    useEffect(() => {
        try {
            // Only try to decode the JWT if one exists
            if (jwtResponse) {
                const { decodedJwtData } = CheckAndDecodeJWT({ jwtResponse, setJwtResponse })!;
                if (decodedJwtData?.UserType === 'Tutor') {
                    navigate("/profile");
                }
            }
        } catch (error) {
            console.error("Failed to decode JWT", error);
            localStorage.clear();
        }
    }, [jwtResponse, navigate]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const subjectService = new SubjectsFilterService();
        const tutorService = new TutorsSearchService();
        const [subjectData, tutorData] = await Promise.all([
            subjectService.getAll("GetSubjectFilters"),
            tutorService.getAllFilteredTutors("GetTutorsList", filters)
        ]);
        setSubjects(subjectData || []);
        setTutors(tutorData || []);
        setLoading(false);
    }, [filters]);

    const handleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement> | ITutorFilterProps) => {
        if ('target' in event) {
            const { name, value } = event.target;
            setFilters(prev => ({...prev, [name]: value }));
        } else {
            setFilters(event);
        }
    }, []);

    const handleCheckboxChange = useCallback((subjectId: string, isChecked: boolean) => {
        setFilters(prevFilters => {
            const updatedSubjects = isChecked
                ? [...prevFilters.subjectIds, subjectId]
                : prevFilters.subjectIds.filter(id => id !== subjectId);
            return {...prevFilters, subjectIds: updatedSubjects };
        });
    }, []);

    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.code;
        const allowedKeys = /Digit[0-9]|NumpadDecimal|Period|Minus|NumpadSubtract|Backspace/;
        if (!keyCode.match(allowedKeys)) {
            event.preventDefault();
        }
    }, []);

    const handleFilterButtonClick = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData().catch(error => {
            console.error('Failed to fetch data:', error);
        });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <TutorsSearchViews
            setTutors={setTutors}
            handleKeyPress={handleKeyPress}
            handleFilterChange={handleFilterChange}
            handleCheckboxChange={handleCheckboxChange}
            handleFilterButtonClick={handleFilterButtonClick}
            tutors={tutors}
            subjects={subjects}
            filters={filters}
        />
    );
}

export default TutorsSearch;