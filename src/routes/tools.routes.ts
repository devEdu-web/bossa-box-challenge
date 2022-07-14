import { Router } from "express";
import toolsControllers from "../app/controllers/tools.controllers";
import authMiddleware from "../app/middlewares/auth.middleware";
const toolsRouter = Router()

toolsRouter.post('/new', authMiddleware.requireUser, toolsControllers.addTool)
toolsRouter.get('/', authMiddleware.requireUser, toolsControllers.getTools)
toolsRouter.delete('/delete/:id', authMiddleware.requireUser, toolsControllers.deleteTool)

export default toolsRouter