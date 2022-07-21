import logger from 'pino';
import dayjs from 'dayjs';
import { BaseLogger } from 'pino';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/default';
import {
  IBaseObject,
  IGetToolsResult,
  IJwtPayload,
  IVerifyJwtReturn,
  UtilsInterface,
} from '../global/interfaces/utils';

const publicKey = config.publicKey;
const privateKey = config.privateKey;

class Utils implements UtilsInterface {
  public log: BaseLogger;

  constructor() {
    this.log = logger({
      transport: {
        target: 'pino-pretty',
      },
      base: {
        pid: false,
      },
      timestamp: () => `,"time": "${dayjs().format()}"`,
    });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }

  async verifyPassword(
    password: string,
    encryptedPassword?: string
  ): Promise<boolean> {
    if (!encryptedPassword) return false;
    return await bcrypt.compare(password, encryptedPassword);
  }

  signJwt(payload: IJwtPayload, options: SignOptions): string {
    return jwt.sign(payload, privateKey, {
      ...options,
      algorithm: 'RS256',
    });
  }

  verifyJwt(token: string): IVerifyJwtReturn {
    try {
      const decoded = jwt.verify(token, publicKey);
      return {
        isValid: true,
        expired: false,
        decoded: decoded,
      };
    } catch (error: any) {
      return {
        isValid: false,
        expired: true,
        decoded: null,
      };
    }
  }

  genCreateTagArray(tags: string[]) {
    const createTagsArray: Array<IBaseObject> = [];

    tags.forEach((tag) => {
      const baseObject: IBaseObject = {
        name: tag,
      };
      createTagsArray.push({ ...baseObject });
    });

    return createTagsArray;
  }

  removeNamePropertyFromToolTagsArray(tools: IGetToolsResult[]) {
    let tagsArray: string[] = [];
    const finalArray: object[] = [];

    tools.forEach((tool) => {
      const temporaryTool: any = { ...tool };
      tool.tags.forEach((tag) => {
        tagsArray.push(tag.name);
      });
      temporaryTool.tags = tagsArray;
      finalArray.push(temporaryTool);
      tagsArray = [];
    });
    return finalArray;
  }
}

export default new Utils();
