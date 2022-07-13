import logger from "pino";
import dayjs from "dayjs";
import { BaseLogger } from 'pino'
import bcrypt from 'bcrypt'
import jwt, { JsonWebTokenError, JwtPayload, SignOptions } from 'jsonwebtoken'
import config from '../config/default'


const publicKey = config.publicKey
const privateKey = config.privateKey

interface UtilsInterface {
  log: BaseLogger
  hashPassword(password: string): Promise<string>
  verifyPassword(password: string, encryptedPassword: string): Promise<boolean>
}
interface IJwtPayload {
  userId: number
  email: string,
}

interface IJwtDecoded extends JwtPayload, IJwtPayload {}
interface IBaseObject {
  name: string
}

interface IVerifyJwtReturn {
  isValid: boolean,
  expired: boolean,
  decoded: object | string | null
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

  signJwt(payload: IJwtPayload, options: SignOptions): string {
    return jwt.sign(payload, privateKey, {
      ...options,
      algorithm: 'RS256'
    })
  }

  verifyJwt(token: string): IVerifyJwtReturn {
    try {
      const decoded = jwt.verify(token, publicKey) 
      return {
        isValid: true,
        expired: false,
        decoded: decoded
      }
    } catch(error: any) {
      return {
        isValid: false,
        expired: true,
        decoded: null
      }
    }
  }

  genCreateTagsArray(tags: string[]) {
    const createTagsArray: Array<object> = []

    tags.forEach(tag => {
      const baseObject: IBaseObject = {
        name: tag
      }
      createTagsArray.push({...baseObject})
    })

    return createTagsArray
  }

}

export default new Utils()