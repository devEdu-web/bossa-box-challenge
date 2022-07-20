import { ToolRepository } from '../../repositories/ToolRepository'
import Utils from '../../utils/Utils'

export class GetToolsService {
  constructor(
    private ToolRepository: ToolRepository
  ) {}
  
  async execute() {
    try {
      const tools = await this.ToolRepository.getTools()
      const finalResult = Utils.removeNamePropertyFromToolTagsArray(tools)
      return finalResult
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}