import { Request, Response } from "express";
import { CreateUserService } from '../../../services/Users/CreateUserService'
import { IController } from "../controller";

export class RegisterController implements IController {
  
  constructor(
    private CreateUserService: CreateUserService
  ) {}

  async handle(req: Request, res: Response) {
    const { firstName, lastName, password, email } = req.body
    try {
      const userSaved = await this.CreateUserService.execute({firstName, lastName, password, email})
      return res.status(201).json(userSaved)
    } catch (error) {
      return res.status(400).json({
        message: 'User Already Exists'
      })
    }

  }


}