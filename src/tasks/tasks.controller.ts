import { Body, Controller, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDTO } from 'src/dto/tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}

    @Post('create/userOwner/:userId')
    public async createTask(@Body() body: TasksDTO, @Param('userId') userId: string) {
        return await this.tasksService.createTask(body, userId);
    }
}
