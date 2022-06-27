import {DbService} from "../dbModule/db.service";
import {BaseDataModel} from "./BaseDataModel";

export abstract class BaseDataMapper {
    protected abstract readonly tableName: string;

    protected constructor(protected readonly dbService: DbService) {
    }

    protected abstract insert(model: BaseDataModel): Promise<BaseDataModel>

    protected abstract update(model: BaseDataModel): Promise<BaseDataModel>

    delete(id: number): Promise<any[]> {
        return this.dbService.execute(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
    }

    save(model: BaseDataModel, checkValid = true): Promise<BaseDataModel> {
        if (checkValid)
            model.checkValid();
        if (model.id)
            return this.update(model);
        return this.insert(model);
    }

    async findById(id: number): Promise<BaseDataModel> {
        const queryResult = await this.dbService.execute(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        if (queryResult.length === 0) return null;
        return queryResult[1];
    }

    async findByIds(ids: number[]) {
        return await this.dbService.execute(`SELECT * FROM ${this.tableName} WHERE id = ANY($1::int[])`, [ids]);
    }
}