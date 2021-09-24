import { Repository, EntityRepository } from "typeorm";
import { Task } from "src/models/tasks/entities/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    
}