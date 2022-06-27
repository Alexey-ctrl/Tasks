import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserMapper} from "./userModel/user.mapper";
import {DbModule} from "../dbModule/db.module";

@Module({
    imports: [DbModule],
    controllers: [UserController],
    providers: [UserService, UserMapper],
    exports: [UserService, UserMapper]
})
export class UserModule {

}