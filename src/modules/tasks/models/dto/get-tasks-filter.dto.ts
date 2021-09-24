import { TaskStatus } from "src/enums/TaskStatus.enum";

export class GetTasksFilterDto {
    status: TaskStatus
    search :string
}