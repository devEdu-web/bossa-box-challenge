import { Tool, Tag } from '@prisma/client';
import { Request, Response } from 'express';
import client from '../../database/client';
import Utils from '../../utils/Utils';
import { addToolPayload } from '../../global/interfaces/tools.controller.interfaces';

class ToolsController {

  async deleteTool(req: Request, res: Response) {
    const { id } = req.params;



    return res.sendStatus(200);
  }

  async filterTools(req: Request<{}, {}, {}, { tag: string }>, res: Response) {
    const { tag } = req.query;

    // const result = Utils.removeNamePropertyFromToolTagsArray(tools);
    
    // return res.json(result);
  }
}

export default new ToolsController();
