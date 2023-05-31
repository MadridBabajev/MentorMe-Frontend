import {IAvailability} from "../../dto/domain/profiles/IAvailability";

export interface IAvailabilityRowProps {
    availability: IAvailability,
    onRemove: (availabilityId: string) => void;
    rowIndex: number;
}