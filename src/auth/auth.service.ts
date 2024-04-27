import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ErrorManager } from 'src/utils/error.util';
import * as bctypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/entities/users.entity';
import { PayloadToken } from 'src/interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}

    public async validateUser(user: string, password: string){
       try {
        const userByUsername = await this.userService.findBy({ key: 'username', value: user });
        const userByEmail = await this.userService.findBy({ key: 'email', value: user });

        if(!userByUsername && !userByEmail) throw new ErrorManager({ type: 'NOT_FOUND', message: 'User not found with those credentials' });

        if(userByUsername){
            const match = await bctypt.compare(password, userByUsername.password);
            if(match) return userByUsername;
        }

        if(userByEmail){
            const match = await bctypt.compare(password, userByEmail.password);
            if(match) return userByEmail;
        }
       } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
       }
    }

    public async signJWT({
        payload,
        secret,
        expiresIn
    }:{
        payload: jwt.JwtPayload,
        secret: string,
        expiresIn: string
    }) {
        return jwt.sign(payload, secret, { expiresIn });
    }

    public async generateJWT(user: UsersEntity){
        try {
            const getUser = await this.userService.findUserById(user.id);
            const payload: PayloadToken = {
                role: getUser.role,
                uid: getUser.id
            }

            return {
                accessToken: await this.signJWT({
                    payload,
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h'
                }),
                user
            }
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }


}
