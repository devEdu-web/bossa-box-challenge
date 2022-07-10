import logger from "pino";
import dayjs from "dayjs";
import { BaseLogger } from 'pino'

interface UtilsInterface {
  log: BaseLogger
}

class Utils {

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
}

export default new Utils()