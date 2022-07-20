import { Router } from "express";
import { createToolController } from '../app/controllers/index'
import authMiddleware from "../app/middlewares/auth.middleware";
const toolsRouter = Router()

// toolsRouter.get('/', authMiddleware.requireUser, toolsControllers.getTools)
// toolsRouter.get('/filter', authMiddleware.requireUser, toolsControllers.filterTools)

toolsRouter.post('/new', authMiddleware.requireUser, (req, res) => {
  return createToolController.handle(req, res)
})
// toolsRouter.delete('/delete/:id', authMiddleware.requireUser, toolsControllers.deleteTool)


export default toolsRouter