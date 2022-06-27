import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "./user/user.module";
import {TaskModule} from "./task/task.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: this}),
        UserModule,
        TaskModule
    ]
})
export class AppModule {

}
