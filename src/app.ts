import express from 'express'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
  }

  private middlewares() {
    this.express.use(express.json())
  }

}

export default new App().express