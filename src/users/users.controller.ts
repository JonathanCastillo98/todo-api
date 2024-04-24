import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post('register')
    public async registerUser(
        @Body() body: UserDTO
    ) {
        return await this.usersService.registerUser(body);
    }

    @Get('all')
    public async findAllUsers(){
        return await this.usersService.findAllUsers();
    }
    
    @Get(':userId')
    public async findUserById(@Param('userId') userId: string) {
        return await this.usersService.findUserById(userId);
    }
    
    @Put('edit/:userId')
    public async updateUser(@Body() body: UserUpdateDTO, @Param('userId') userId: string) {
        return await this.usersService.updateUser(body, userId);
    }
    
    @Delete('delete/:userId')
    public async deleteUser(@Param('userId') userId: string) {
        return await this.usersService.deleteUser(userId);
    }
}
