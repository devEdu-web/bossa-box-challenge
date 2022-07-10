import logger from "pino";
import dayjs from "dayjs";
import { BaseLogger } from 'pino'
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import config from '../config/default'

const publicKey = config.publicKey
const privateKey = config.privateKey

interface UtilsInterface {
  log: BaseLogger
  hashPassword(password: string): Promise<string>
  verifyPassword(password: string, encryptedPassword: string): Promise<boolean>
}

class Utils implements UtilsInterface{

  public log: BaseLogger

  constructor() {
    this.log = logger({
      transport: {
        target: 'pino-pretty'
      },
      base: {
        pid: false
      },
      timestamp: () => `,"time": "${dayjs().format()}"`
    })
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
  }

  async verifyPassword(password: string, encryptedPassword?: string): Promise<boolean> {
    if(!encryptedPassword) return false 
    return await bcrypt.compare(password, encryptedPassword)
  }

  signJwt<T>(payload: object, options: SignOptions): string {
    return jwt.sign(payload, privateKey, {
      ...options,
      algorithm: 'RS256'
    })
  }

}

export default new Utils()