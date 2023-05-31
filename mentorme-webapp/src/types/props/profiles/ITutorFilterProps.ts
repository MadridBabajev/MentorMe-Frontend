
export interface ITutorFilterProps {
    firstName?: string | null;
    lastName?: string | null;
    minClassesCount?: number | null;
    maxClassesCount?: number | null;
    minHourlyRate?: number | null;
    maxHourlyRate?: number | null;
    minAverageRating?: number | null;
    maxAverageRating?: number | null;
    subjectIds: string[]
}