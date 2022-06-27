import {Module, OnApplicationShutdown} from "@nestjs/common";
import {DbService} from "./db.service";
import {Pool} from "pg";
import {ModuleRef} from "@nestjs/core";

@Module({
    providers: [
        {
            provide: 'DB_POOL',
            useFactory: () => new Pool()
        },
        DbService],
    exports: [DbService]
})
export class DbModule implements OnApplicationShutdown {
    constructor(private readonly moduleRef: ModuleRef) {}

    onApplicationShutdown(signal?: string): any {
        const pool = this.moduleRef.get('DB_POOL') as Pool;
        return pool.end();
    }
}