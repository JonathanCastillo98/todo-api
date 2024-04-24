import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from 'src/dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('login')
    async login(@Body() {user, password}: AuthDTO) {
        const validUser = await this.authService.validateUser(
            user,
            password,
        )
        if(!validUser) throw new UnauthorizedException('Invalid credentials');
        return await this.authService.generateJWT(validUser);
    }
}
