import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from 'src/entities/tasks.entity';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, UsersEntity])],
  providers: [TasksService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}
