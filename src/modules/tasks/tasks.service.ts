import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskRepository } from 'src/repositories/task.repository';
import { Messages } from 'src/common/constants/message.data';
import { Task } from 'src/models/tasks/entities/task.entity';

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TaskRepository) private taskRepository:TaskRepository) {}
 
    async getTaskById(id: number): Promise<Task> {

        const task = await this.taskRepository.findOne(id);
        if(!task){
            throw new NotFoundException(`Task not found`)
        }
        return task;
    }
}
