import { NextFunction, Request, Response } from 'express';
import Utils from '../../utils/Utils';
import config from '../../config/default';

export class RequireUserMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    if (!user) {
      return res.sendStatus(403);
    }
    next();
  }
}

