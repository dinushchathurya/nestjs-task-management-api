import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Patch } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from 'src/models/tasks/entities/task.entity';
import { CreateTaskDto } from 'src/models/tasks/dto/create-task.dto';
import { TaskStatusValidationPipe } from 'src/common/validations/task-status-validatiom.pipe';
import { TaskStatus } from 'src/common/enums/TaskStatus.enum';

@Controller('tasks')
export class TasksController {

    constructor( private tasksService:TasksService) { }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number ): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus) : Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
