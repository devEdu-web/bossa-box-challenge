import { ToolRepository } from '../../repositories/ToolRepository';
import Util from '../../utils/Utils';

interface IToolPayload {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export class CreateToolService {
  constructor(private ToolRepository: ToolRepository) {}

  async execute(tool: IToolPayload) {
    const { title, link, description, tags } = tool;
    const toolPreSave = Util.genCreateTagArray(tags);

    try {
      const toolSaved = await this.ToolRepository.create({
        title,
        link,
        description,
        tags: toolPreSave,
      });
      toolSaved?.tags = tags;
      return toolSaved;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
