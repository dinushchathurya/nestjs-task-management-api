import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nestjs_task_management",
    synchronize: true,
    logging: true,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
}

export default config;