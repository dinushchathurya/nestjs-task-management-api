import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './../ormconfig';

import { TasksModule } from './modules/tasks/tasks.module';


@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        TasksModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }