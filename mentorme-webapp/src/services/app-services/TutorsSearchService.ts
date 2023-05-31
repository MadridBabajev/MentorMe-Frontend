import {BaseEntityService} from "../base-services/BaseEntityService";
import {ITutorSearch} from "../../types/dto/domain/profiles/ITutorSearch";
import {ITutorFilterProps} from "../../types/props/profiles/ITutorFilterProps";
import {HostURLs} from "../../types/strings/HostURLs";

export class TutorsSearchService extends BaseEntityService<ITutorSearch> {
    constructor() {
        super(HostURLs.PROFILE_CONTROLLER);
    }

    async getAllFilteredTutors(path: string, filters: ITutorFilterProps): Promise<ITutorSearch[] | undefined> {
        try {
            const processedFilters = Object.keys(filters).reduce((acc, key) => {
                let value = filters[key as keyof ITutorFilterProps];

                // Setting up default values for fields
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