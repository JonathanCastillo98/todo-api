import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { IsAuthorizedGuard } from 'src/guards/is-authorized.guard';
import { Autorize } from 'src/decorators/authorize.decorator';
import { ROLES } from 'src/constants/roles';

@Controller('users')
@UseGuards(IsAuthenticatedGuard, IsAuthorizedGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Autorize({ roles: [ROLES.ADMIN] })
    @Post('register')
    public async registerUser(
        @Body() body: UserDTO
    ) {
        return await this.usersService.registerUser(body);
    }

    @Autorize({ roles: [ROLES.ADMIN] })
    @Get('all')
    public async findAllUsers(){
        return await this.usersService.findAllUsers();
    }
    
    @Autorize({ roles: [ROLES.ADMIN] })
    @Get(':userId')
    public async findUserById(@Param('userId') userId: string) {
        return await this.usersService.findUserById(userId);
    }
    
    @Autorize({ roles: [ROLES.ADMIN] })
    @Put('edit/:userId')
    public async updateUser(@Body() body: UserUpdateDTO, @Param('userId') userId: string) {
        return await this.usersService.updateUser(body, userId);
    }
    
    @Autorize({ roles: [ROLES.ADMIN] })
    @Delete('delete/:userId')
    public async deleteUser(@Param('userId') userId: string) {
        return await this.usersService.deleteUser(userId);
    }
}
