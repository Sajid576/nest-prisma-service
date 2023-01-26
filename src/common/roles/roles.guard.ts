import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Role } from './';
import { decodeToken } from 'src/utils/jwt.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    const decoded = decodeToken(req.headers.authorization.split(' ')[1]);

    if (decoded && typeof decoded !== 'string' && decoded.roles) {
      if (requiredRoles.some((role) => decoded.roles.includes(role))) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
