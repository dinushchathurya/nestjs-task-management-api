import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './models/interfaces/task.model';
import { CreateTaskDto } from './models/dto/create-task.dto';
import { TaskStatus } from 'src/enums/TaskStatus.enum';
import { GetTasksFilterDto } from './models/dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {

    constructor( private tasksService:TasksService) { }
    
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        } else {
            return this.tasksService.getTasks();
        }
    }

    @Get('/:id')
    getAllTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto:CreateTaskDto) : Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TaskStatus
    ) : Task {
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTAsk(@Param('id') id: string) : void {
        return this.tasksService.deleteTask(id);
    }
    
}
