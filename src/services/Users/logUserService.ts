import { UserRepository } from '../../repositories/UserRepository';
import client from '../../database/client';
import Utils from '../../utils/Utils';
import config from '../../config/default';

export class LogUserService {
  constructor(UserRepository: UserRepository) {}

  async execute(email: string, password: string) {
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
        throw new Error('Email or password invalid.');

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

      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
