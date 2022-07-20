import { IController } from '../controller';
import { DeleteToolService } from '../../../services/Tools/DeleteToolService';
import { Request, Response } from 'express';

export class DeleteToolController implements IController {
  constructor(private DeleteToolService: DeleteToolService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await this.DeleteToolService.execute(Number(id));
      return res.sendStatus(200);
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
