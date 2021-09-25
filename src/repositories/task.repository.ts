import { Repository, EntityRepository } from "typeorm";

import { Task } from "src/models/tasks/entities/task.entity";
import { CreateTaskDto } from "src/models/tasks/dto/create-task.dto";
import { TaskStatus } from "src/common/enums/TaskStatus.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
    async createTask(createTaskDto:CreateTaskDto): Promise<Task> {

        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status= TaskStatus.OPEN;
        await task.save();

        return task;

    }
}