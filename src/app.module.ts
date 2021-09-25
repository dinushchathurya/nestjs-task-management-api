import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './../ormconfig';

import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        TasksModule,
        AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }