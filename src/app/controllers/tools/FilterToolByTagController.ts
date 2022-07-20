import { IController } from "../controller";
import { FilterToolByTagService } from '../../../services/Tools/FilterToolByTagService'
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class FilterToolByTagController implements IController {
  constructor(
    private FilterToolByTagService: FilterToolByTagService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const tag = req.query.tag + ""
    // console.log(req.params)
    console.log(tag)
    try {
      const tools = await this.FilterToolByTagService.execute(tag)
      return res.json(tools)
    } catch (error: any) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

}