import express, { Router } from 'express'
import authController from '../app/controllers/auth.controllers'
const authRouter = Router()

authRouter.post('/register', authController.registerUser)


export default authRouter