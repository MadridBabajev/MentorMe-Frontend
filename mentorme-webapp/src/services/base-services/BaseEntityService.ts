
import { IBaseEntity } from "../../types/dto/domain/base/IBaseEntity";
import { BaseService } from "./BaseService";

export abstract class BaseEntityService<TEntity extends IBaseEntity> extends BaseService {
    protected constructor(baseUrl: string) {
        super(baseUrl);
    }

    async getAllPrivate(jwt: string): Promise<TEntity[] | undefined> {
        try {
            const response = await this.axios.get<TEntity[]>('',
                {
                    headers: {
                        'Authorization': 'Bearer ' + jwt
                    }
                }
            );

            // console.log('response', response);
            if (response.status === 200) {
                return response.data as TEntity[];
            }
            return undefined;
        } catch (e) {
            // console.log('error: ', (e as Error).message);
            return undefined;
        }
    }

    async getAll(path: string): Promise<TEntity[] | undefined> {
        try {
            const response = await this.axios.get<TEntity[]>(path);
            if (response.status === 200) {
                return response.data as TEntity[];
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    async findOneById(path: string): Promise<TEntity | undefined> {
        try {
            const response = await this.axios.get<TEntity>(path);
            if (response.status === 200) {
                return response.data as TEntity;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }
}