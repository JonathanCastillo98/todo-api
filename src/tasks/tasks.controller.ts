import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksDTO } from 'src/dto/tasks.dto';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { IsAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { Autorize } from 'src/decorators/authorize.decorator';
import { ROLES } from 'src/constants/roles';

@Controller('tasks')
@UseGuards(IsAuthenticatedGuard, IsAuthorizedGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
    ) {}

    @Autorize({roles: [ROLES.ADMIN], allowSameUser: true})
    @Post('create/userOwner/:userId')
    public async createTask(@Body() body: TasksDTO, @Param('userId') userId: string) {
        return await this.tasksService.createTask(body, userId);
    }
}
