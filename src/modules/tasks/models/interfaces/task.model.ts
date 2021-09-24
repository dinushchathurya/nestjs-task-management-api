import { TaskStatus } from "src/enums/TaskStatus.enum";

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus
}