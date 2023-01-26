import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decodeToken } from 'src/utils/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization) {
      return false;
    }
    const decoded = decodeToken(req.headers.authorization.split(' ')[1]);

    if (decoded && typeof decoded !== 'string' && decoded.email) {
      return true;
    }

    return false;
  }
}
