import { Request, Response } from "express";
import { IController } from "../controller";
import { LogUserService } from '../../../services/Users/logUserService'


export class IssueTokensController implements IController {
  constructor(
    private LogUserService: LogUserService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      const tokens = await this.LogUserService.execute(email, password)
      return res.status(201).json(tokens)
    } catch (error) {
      return res.status(400).json(error)
    }


  }

}