import { BaseLogger } from 'pino';
import { JwtPayload } from 'jsonwebtoken';

export interface UtilsInterface {
  log: BaseLogger;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, encryptedPassword: string): Promise<boolean>;
}
export interface IJwtPayload {
  userId: number;
  email: string;
}

export interface IJwtDecoded extends JwtPayload, IJwtPayload {}

export interface IBaseObject {name: string;}

export interface IVerifyJwtReturn {
  isValid: boolean;
  expired: boolean;
  decoded: object | string | null;
}

export interface IGetToolsResult {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  tags: IBaseObject[];
}
