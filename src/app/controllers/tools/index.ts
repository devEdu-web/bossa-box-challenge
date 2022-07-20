import { ToolRepository } from '../../../repositories/ToolRepository';
import { CreateToolService } from '../../../services/Tools/CreateToolService';
import { DeleteToolService } from '../../../services/Tools/DeleteToolService';
import { FilterToolByTagService } from '../../../services/Tools/FilterToolByTagService';
import { GetToolsService } from '../../../services/Tools/GetToolsService';
import { CreateToolController } from './CreateToolController';
import { DeleteToolController } from './DeleteToolController';
import { FilterToolByTagController } from './FilterToolByTagController';
import { GetToolsController } from './GetToolsController';

const toolRepository = new ToolRepository();

const createToolService = new CreateToolService(toolRepository);
const getToolsService = new GetToolsService(toolRepository);
const deleteToolService = new DeleteToolService(toolRepository);
const filterToolByTagService = new FilterToolByTagService(toolRepository);

const createToolController = new CreateToolController(createToolService);
const getToolsController = new GetToolsController(getToolsService);
const deleteToolController = new DeleteToolController(deleteToolService);
const filterToolByTagController = new FilterToolByTagController(
  filterToolByTagService
);

export {
  createToolController,
  getToolsController,
  deleteToolController,
  filterToolByTagController,
};
