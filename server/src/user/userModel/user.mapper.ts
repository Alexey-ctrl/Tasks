import {Injectable} from "@nestjs/common";
import {BaseDataMapper} from "../../baseModel/BaseDataMapper";
import {User} from "./user";
import {DbService} from "../../dbModule/db.service";
import {ConfigService} from "@nestjs/config";
import {CreateUserDto} from "../dto/createUserDto";

@Injectable()
export class UserMapper extends BaseDataMapper {
    readonly tableName = 'users';

    constructor(private readonly config: ConfigService, dbService: DbService) {
        super(dbService);
    }

    protected async insert(user: User): Promise<User> {
        const result = await this.dbService.execute(
            `INSERT INTO ${this.tableName} (username, password) VALUES ($1, $2) RETURNING id`,
            [user.username, user.password]
        );
        user.id = result[0].id;
        return user;
    }

    protected async update(user: User): Promise<User> {
        await this.dbService.execute(`UPDATE ${this.tableName} SET username = $1, password = $2 WHERE id = $3`,
            [user.username, user.password, user.id]
        );
        return user;
    }

    async getByUsername(username: string): Promise<User> {
        const userData = await this.dbService.execute(`SELECT * FROM ${this.tableName} WHERE username = $1`, [username]);
        if (userData.length === 0)
            return null;
        const user = new User(this.config.get('BCRYPT_SALT'), {
            username: userData[0].username,
            password: userData[0].password
        } as CreateUserDto);
        user.id = userData[0].id;
        return user;
    }
}