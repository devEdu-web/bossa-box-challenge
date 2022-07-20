import { Router } from "express";
import { createToolController, getToolsController } from '../app/controllers/index'
import authMiddleware from "../app/middlewares/auth.middleware";
const toolsRouter = Router()

toolsRouter.get('/', authMiddleware.requireUser, (req, res) => {
  return getToolsController.handle(req, res)
})

// toolsRouter.get('/filter', authMiddleware.requireUser, toolsControllers.filterTools)

toolsRouter.post('/new', authMiddleware.requireUser, (req, res) => {
  return createToolController.handle(req, res)
})
// toolsRouter.delete('/delete/:id', authMiddleware.requireUser, toolsControllers.deleteTool)


export default toolsRouter