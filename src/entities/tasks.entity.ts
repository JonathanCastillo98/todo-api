import { ITask } from "../interfaces/task.interface";
import { BaseEntity } from "./base.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TASKS_STATUS } from "../constants/tasks-status";
import { UsersEntity } from "./users.entity";

@Entity({name: 'tasks'})
export class TasksEntity extends BaseEntity implements ITask{
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({type:'enum', enum: TASKS_STATUS})
    status: TASKS_STATUS;
    @ManyToOne(() => UsersEntity, (user) => user.tasks)
    @JoinColumn({name: 'user_id'})
    user: UsersEntity;
    
}