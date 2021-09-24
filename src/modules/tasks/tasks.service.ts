import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './models/interfaces/task.model';
import { TaskStatus } from 'src/enums/TaskStatus.enum';
import { CreateTaskDto } from './models/dto/create-tasl.dto';

@Injectable()
export class TasksService {

    private tasks : Task[]= [];

    getAllTasks() : Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto) :Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.DONE
        }
        this.tasks.push(task);
        return task;
    }
}
