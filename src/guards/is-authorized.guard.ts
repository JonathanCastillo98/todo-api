import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY, AUTHORIZE_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class IsAuthorizedGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) {}
  async canActivate(
    context: ExecutionContext,
  ) {

    
    type authorizationOptions = {
        roles: ROLES[];
        allowSameUser?: boolean | undefined;
    };

    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    )

    if(isPublic) return true;

    const options = this.reflector.get<authorizationOptions>(
      AUTHORIZE_KEY,
      context.getHandler()
    )

    const req = context.switchToHttp().getRequest<Request>();

    const { uid,  role, email } = req;
    const { userId } = req.params;
    
    if (email === process.env.SUPER_ADMIN_EMAIL) {
        return true
    }

    if(options === undefined) {
      return true;
    }

    if (!role) {
        throw new ForbiddenException('No role provided');
    }

    if (options.roles.includes(role as ROLES)) {
        return true;
    }

    if (options.allowSameUser && userId && userId === uid) {
        return true;
    } else {
        throw new ForbiddenException('Not enough permissions');
    }
  }
}
