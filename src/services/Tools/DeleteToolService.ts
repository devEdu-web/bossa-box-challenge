import { ToolRepository } from '../../repositories/ToolRepository';

export class DeleteToolService {
  constructor(private ToolRepository: ToolRepository) {}

  async execute(id: number) {
    try {
      const result = await this.ToolRepository.deleteTool(id);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
