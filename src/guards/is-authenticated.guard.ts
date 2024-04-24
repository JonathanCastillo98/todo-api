import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { ErrorManager } from 'src/utils/error.util';
import { Request } from 'express';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )

    if(isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    if (!req.headers["authorization"]) throw new UnauthorizedException('No authorization header');
    if (!req.headers["authorization"].startsWith("Bearer")) throw new UnauthorizedException('No Bearer schema');

    const splittedToken = req.headers["authorization"].split("Bearer ");

    if (splittedToken.length !== 2) throw new UnauthorizedException('Invalid Token');

    const token = splittedToken[1];

    try {
      const decodedtoken = jwt.verify(token, process.env.JWT_SECRET) as {uid: string, role: string};
      const user = await this.userService.findUserById(decodedtoken.uid);
      req.uid = decodedtoken.uid;
      req.role = decodedtoken.role; 
      req.email = user.email;
      return true;     
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }

  }
}
