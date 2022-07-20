import { Request, Response } from 'express';
import Utils from '../../utils/Utils';
import client from '../../database/client';
import config from '../../config/default';
import {
  issueTokensPayload,
  registerUserPayload,
} from '../../global/interfaces/auth.controller.interfaces';

class AuthController {

  public async issueTokensController(
    req: Request<{}, {}, issueTokensPayload>,
    res: Response
  ): Promise<Response> {
    const { email, password } = req.body;
    try {
      const user = await client.user.findUnique({
        where: {
          email: email,
        },
      });
      const isPasswordValid = await Utils.verifyPassword(
        password,
        user?.password
      );
      if (!user || !isPasswordValid)
        return res.json({ error: 'Email or password invalid.' });

      const accessToken = Utils.signJwt(
        {
          email: email,
          userId: user.id,
        },
        {
          expiresIn: config.accessTokenTtl,
        }
      );

      const refreshToken = Utils.signJwt(
        {
          email: email,
          userId: user.id,
        },
        {
          expiresIn: config.refreshTokenTtl,
        }
      );

      Utils.log.info(
        `New access and refresh tokens issued to the user with email ${user.email}`
      );
      return res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default new AuthController();
