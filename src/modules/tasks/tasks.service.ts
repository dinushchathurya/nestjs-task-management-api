import { Injectable, Query } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './models/interfaces/task.model';
import { TaskStatus } from 'src/enums/TaskStatus.enum';
import { CreateTaskDto } from './models/dto/create-task.dto';
import { GetTasksFilterDto } from './models/dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks : Task[]= [];

    getTasks() : Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTasksFilterDto) : Task[] {

        const { status, search } = filterDto;
        let tasks = this.getTasks();

        if(status) {
            tasks = tasks.filter(task=> task.status === status)
        }

        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || task.description.includes(search)
            )
        }

        return tasks;
    }

    getTaskById(id: string) : Task {
        return this.tasks.find(task=> task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto) : Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string) : void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

}
