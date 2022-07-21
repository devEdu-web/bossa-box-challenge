import express from 'express';
import authRouter from './routes/auth.routes';
import { deserializeUserMiddleware } from './app/middlewares/index';
import toolsRouter from './routes/tools.routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(deserializeUserMiddleware);
  }

  private routes() {
    this.express.use('/api/auth', authRouter);
    this.express.use('/api/tools', toolsRouter);
  }
}

export default new App().express;
