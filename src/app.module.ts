import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.develop.env`
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}
