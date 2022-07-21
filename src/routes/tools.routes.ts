import { Router } from 'express';
import {
  createToolController,
  getToolsController,
  deleteToolController,
  filterToolByTagController,
} from '../app/controllers/index';

import {  requireUserMiddleware } from '../app/middlewares/index';

const toolsRouter = Router();

toolsRouter.get('/', requireUserMiddleware, (req, res) => {
  return getToolsController.handle(req, res);
});

toolsRouter.get('/filter', requireUserMiddleware, (req, res) => {
  return filterToolByTagController.handle(req, res);
});

toolsRouter.post('/new', requireUserMiddleware, (req, res) => {
  return createToolController.handle(req, res);
});

toolsRouter.delete('/delete/:id', requireUserMiddleware, (req, res) => {
  return deleteToolController.handle(req, res);
});

export default toolsRouter;
