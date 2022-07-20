import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { CreateToolService } from '../../../services/Tools/CreateToolService'
import { IController } from '../controller'

export class CreateToolController implements IController {
  constructor(
    private CreateToolService: CreateToolService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { title, description, link, tags } = req.body

    try {
      const toolSaved = await this.CreateToolService.execute({title, description, link, tags})
      return res.status(201).json(toolSaved)
    } catch (error: any) {
      return res.status(400).json({
        message: error.message
      })
    }

  } 

}