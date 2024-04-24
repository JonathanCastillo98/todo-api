import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "./base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ROLES } from "../constants/roles";
import { TasksEntity } from "./tasks.entity";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: ROLES})
    role: string;

    @OneToMany(() => TasksEntity, (task) => task.user)
    tasks: TasksEntity[];
}