import express, { Router } from 'express'
import authController from '../app/controllers/auth.controllers'
import authMiddleware from '../app/middlewares/auth.middleware'
const authRouter = Router()

authRouter.post('/register', authController.registerUser)
authRouter.post('/tokens/new', authMiddleware.requireUser, authController.issueTokensController)


export default authRouter