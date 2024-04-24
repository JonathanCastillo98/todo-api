import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.util';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ){}

    public async registerUser(body: UserDTO): Promise<UsersEntity> {
        try {
            const hashedPassword = await bcrypt.hash(body.password, +process.env.HASH_SALT);
            body.password = hashedPassword;
            return await this.userRepository.save(body);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findAllUsers(): Promise<UsersEntity[]> {
        try {
            const users = await this.userRepository.find();
            if(users.length === 0) throw new ErrorManager({ type: 'NOT_FOUND', message: 'No users found' });
            return users;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findBy({ key, value }: {
        key: keyof UserDTO;
        value: any;
    }) {
        try {
            const user: UsersEntity = await this.userRepository.createQueryBuilder('user').addSelect('user.password').where({ [key]: value }).getOne();
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
   
    public async findUserById(userId: string): Promise<UsersEntity> {
        try {
            const user = await this.userRepository.createQueryBuilder('user').where({ id: userId }).leftJoinAndSelect('user.tasks', 'tasks').getOne();
            if(!user) throw new ErrorManager({ type: 'NOT_FOUND', message: 'User not found' });
            return user;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    public async updateUser(body: UserUpdateDTO,userId: string): Promise<UpdateResult | undefined> {
        try {
            const updatedUser: UpdateResult = await this.userRepository.update(userId, body);
            if(updatedUser.affected === 0) throw new ErrorManager({ type: 'BAD_REQUEST', message: 'Update User failed' });
            return updatedUser;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteUser(userId: string): Promise<DeleteResult | undefined> {
        try {
            const deletedUser: DeleteResult = await this.userRepository.delete(userId);
            if(deletedUser.affected === 0) throw new ErrorManager({ type: 'BAD_REQUEST', message: 'Delete User failed' });
            return deletedUser;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }


}
