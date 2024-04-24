import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TASKS_STATUS } from "src/constants/tasks-status";

export class TasksDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TASKS_STATUS)
    @IsNotEmpty()
    status: TASKS_STATUS;
}

export class TasksUpdateDTO {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(TASKS_STATUS)
    @IsOptional()
    status: TASKS_STATUS;
}