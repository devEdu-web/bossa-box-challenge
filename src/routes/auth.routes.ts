import { Router } from 'express';

import {
  registerController,
  issueTokensController,
} from '../app/controllers/index';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
  return registerController.handle(req, res);
});

authRouter.post('/tokens/new', (req, res) => {
  return issueTokensController.handle(req, res);
});

export default authRouter;
