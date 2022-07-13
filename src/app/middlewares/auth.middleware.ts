import { NextFunction, Request, Response } from 'express'
import Utils from '../../utils/Utils'
import config from '../../config/default'

class AuthMiddleware {
  deserializeUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = (req.headers.authorization)?.replace('Bearer ', '')
    const refreshToken = String((req.headers['x-refresh-token']))

    if(!accessToken) {
      Utils.log.info('Deserialize user: No access token was passed.')
      return next()
    }

    const { decoded, expired } = Utils.verifyJwt(accessToken)
    if(decoded) {
      res.locals.user = decoded
      Utils.log.info('Deserialize user: A valid access token was passed. User attached to locals.')
      return next()
    }

    if(expired && refreshToken) {
      const { expired, decoded } = Utils.verifyJwt(refreshToken)
      if(expired || !decoded) {
        Utils.log.info('Deserialize user: Invalid access token were passed. Refresh token also invalid.')
        return next()
      }
      
      const newAccessToken = Utils.signJwt({
        email: (<any>decoded).email,
        userId: (<any>decoded).userId
      }, {
        expiresIn: config.accessTokenTtl
      })

      res.setHeader('x-refresh-token', newAccessToken)

      const result = Utils.verifyJwt(newAccessToken)
      res.locals.user = result.decoded

      Utils.log.info('Deserialize user: Invalid access token were passed. Refresh token was valid, new access token was issued and sent to the client.')
      return next()

    }
    return next()
  }

  requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user
    if(!user) {
      Utils.log.info('No user required, access was denied.')
      return res.sendStatus(403)
    }
    Utils.log.info('User required, access was granted.')
    next()

  } 

}

export default new AuthMiddleware()