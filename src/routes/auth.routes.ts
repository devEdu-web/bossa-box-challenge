import express, { Router } from 'express'
import authController from '../app/controllers/auth.controllers'

import { registerController } from '../app/controllers/index'

const authRouter = Router()

authRouter.post('/register', (req, res) => {
  return registerController.handle(req, res)
})

authRouter.post('/tokens/new', authController.issueTokensController)


export default authRouter