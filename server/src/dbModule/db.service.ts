import {Inject, Injectable} from "@nestjs/common";
import {Pool} from "pg";

@Injectable()
export class DbService {
    constructor(@Inject('DB_POOL') private readonly pool: Pool) {}

    async execute(text: string, values = []): Promise<any[]> {
        const result = await this.pool.query(text, values);
        return result.rows;
    }
}