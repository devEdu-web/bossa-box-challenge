import express from 'express'
import authRouter from './routes/auth.routes'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.express.use(express.json())
  }

  private routes() {
    this.express.use('/api/auth', authRouter)
  }

}

export default new App().express