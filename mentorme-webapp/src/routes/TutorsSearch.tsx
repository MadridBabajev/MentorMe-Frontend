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
import {GetServicePaths} from "../types/strings/GetServicePaths";
import {Navigations} from "../types/strings/Navigations";
import {Patterns} from "../types/strings/Patterns";
import {UserTypes} from "../types/strings/UserTypes";

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
                if (decodedJwtData?.UserType === UserTypes.TUTOR) {
                    navigate(Navigations.PROFILE);
                }
            }
        } catch (error) {
            console.error("Failed to decode JWT" + error);
            localStorage.clear();
        }
    }, [jwtResponse, navigate, setJwtResponse]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const subjectService = new SubjectsFilterService();
        const tutorService = new TutorsSearchService();
        const [subjectData, tutorData] = await Promise.all([
            subjectService.getAll(GetServicePaths.SUBJECT_FILTERS),
            tutorService.getAllFilteredTutors(GetServicePaths.TUTORS_LIST, filters)
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
        const allowedKeys = new RegExp(Patterns.ALLOWED_NUMBER_INPUTS);
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
    }, [fetchData]);

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