import { NextFunction, Request, Response } from 'express';
import Utils from '../../utils/Utils';
import config from '../../config/default';

export class DeserializeUserMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    console.log('deserialize user middleware')
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    const refreshToken = String(req.headers['x-refresh-token']);

    if (!accessToken) {
      Utils.log.info('Deserialize user: No access token was passed.');
      return next();
    }

    const { decoded, expired } = Utils.verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      return next();
    }

    if (expired && refreshToken) {
      const { expired, decoded } = Utils.verifyJwt(refreshToken);
      if (expired || !decoded) {
        return next();
      }

      const newAccessToken = Utils.signJwt(
        {
          email: (<any>decoded).email,
          userId: (<any>decoded).userId,
        },
        {
          expiresIn: config.accessTokenTtl,
        }
      );

      res.setHeader('x-refresh-token', newAccessToken);

      const result = Utils.verifyJwt(newAccessToken);
      res.locals.user = result.decoded;

      return next();
    }
    return next();



  }
}