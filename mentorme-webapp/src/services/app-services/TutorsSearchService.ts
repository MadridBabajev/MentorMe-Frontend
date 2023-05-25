import {BaseEntityService} from "../base-services/BaseEntityService";
import {ITutorSearch} from "../../types/dto/domain/profiles/ITutorSearch";
import {ITutorFilterProps} from "../../types/props/profiles/ITutorFilterProps";

export class TutorsSearchService extends BaseEntityService<ITutorSearch> {
    constructor() {
        super('v1/profile/');
    }

    async getAllFilteredTutors(path: string, filters: ITutorFilterProps): Promise<ITutorSearch[] | undefined> {
        try {
            const processedFilters = Object.keys(filters).reduce((acc, key) => {
                let value = filters[key as keyof ITutorFilterProps];

                // Set default values for fields
                if (value === "") {
                    value = null;
                }
                return {...acc, [key]: value};
            }, {} as ITutorFilterProps);

            const response = await this.axios.post<ITutorSearch[]>(path, processedFilters);
            if (response.status === 200) {
                return response.data as ITutorSearch[];
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
}