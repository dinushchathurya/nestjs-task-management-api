import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from 'src/repositories/task.repository';
import { Task } from 'src/models/tasks/entities/task.entity';
import { CreateTaskDto } from 'src/models/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository:TaskRepository) {}
    
    // get single Task
    async getTaskById(id: number): Promise<Task> {

        const task = await this.taskRepository.findOne(id);
        if(!task){
            throw new NotFoundException(`Task not found`)
        }
        return task;
    }

    // create new Task
    async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // delete Task
    async deleteTask(id: number): Promise<void> {
        
        const task = await this.taskRepository.delete(id);

        if(task.affected === 0) {
            throw new NotFoundException(`Task with ${id} not found`);
        }
    }
}
