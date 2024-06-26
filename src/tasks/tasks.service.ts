import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksDTO } from 'src/dto/tasks.dto';
import { TasksEntity } from 'src/entities/tasks.entity';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.util';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity)
        private readonly tasksRepository: Repository<TasksEntity>,
        private readonly usersService: UsersService,
    ) {}

    public async createTask(body: TasksDTO, userId: string): Promise<any> {
        try {   
            const usr = await this.usersService.findUserById(userId);
            if(!usr) throw new ErrorManager({ type: 'NOT_FOUND', message: 'User not found' });
            const task = await this.tasksRepository.save({ ...body, user: usr});
            const {user, ...newTask} = task;            
            return newTask;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
