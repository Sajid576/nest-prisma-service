import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: Request, res: Response, next: Function) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest && offuscateRequest.password)
        offuscateRequest.password = '*******';
      if (offuscateRequest && offuscateRequest.newPassword)
        offuscateRequest.newPassword = '*******';
      if (offuscateRequest && offuscateRequest.currentPassword)
        offuscateRequest.currentPassword = '*******';

      const request = {
        method: req.method,
        url: `${req.protocol}://${req.get('Host')}${req.originalUrl}`,
        body: req.body,
      };

      console.log('Request Object', JSON.stringify(request, null, 2));
    } catch (error) {
      this.logger.error(error.message);
    }
    next();
  }
}
