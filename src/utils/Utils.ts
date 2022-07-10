import logger from "pino";
import dayjs from "dayjs";
import { BaseLogger } from 'pino'
import bcrypt from 'bcrypt'

interface UtilsInterface {
  log: BaseLogger
  hashPassword(password: string): Promise<string>
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

}

export default new Utils()