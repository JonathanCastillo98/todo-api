import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    public async registerUser(
        @Body() body: UserDTO
    ) {
        return await this.usersService.createUser(body);
    }
}
