import { ToolRepository } from '../../repositories/ToolRepository';
import Utils from '../../utils/Utils';

export class FilterToolByTagService {
  constructor(private ToolRepository: ToolRepository) {}

  async execute(tag: string) {
    try {
      const tools = await this.ToolRepository.filterToolByTag(tag);

      return Utils.removeNamePropertyFromToolTagsArray(tools);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
