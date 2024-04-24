import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "./base.entity";
import { Column, Entity } from "typeorm";
import { ROLES } from "../constants/roles";

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
}