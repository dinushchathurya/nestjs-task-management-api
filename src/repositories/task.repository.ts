import { Repository, EntityRepository } from "typeorm";

import { Task } from "src/models/tasks/entities/task.entity";
import { CreateTaskDto } from "src/models/tasks/dto/create-task.dto";
import { TaskStatus } from "src/common/enums/TaskStatus.enum";
import { GetTasksFilterDto } from "src/models/tasks/dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if(status) {
            query.where('task.status = :status', { status });
        }

        if(search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
        }

        const tasks = await query.getMany();
        return tasks;
    }
    
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