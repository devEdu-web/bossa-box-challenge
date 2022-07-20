import { Request, Response } from 'express'
import { GetToolsService } from '../../../services/Tools/GetToolsService'
import { IController } from '../controller'

export class GetToolsController implements IController{
  constructor(
    private GetToolsService: GetToolsService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const tools = await this.GetToolsService.execute()
      return res.json(tools)
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

}