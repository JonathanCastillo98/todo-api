import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../dto/users.dto';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ){}

    public async createUser(body: UserDTO): Promise<UsersEntity> {
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
            return await this.userRepository.save(body);
        } catch (error) {
            console.log(error);
            
        }
    }
}
