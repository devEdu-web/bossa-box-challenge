import { UserRepository } from '../../repositories/UserRepository'
import { ToolRepository } from '../../repositories/ToolRepository'

import { RegisterController } from '../controllers/auth/RegisterController'
import { IssueTokensController } from '../controllers/auth/issueTokensController'

import { CreateToolController } from '../controllers/tools/CreateToolController'

import { CreateUserService } from '../../services/Users/CreateUserService'
import { LogUserService } from '../../services/Users/logUserService'

import { CreateToolService } from '../../services/Tools/CreateToolService'
import { GetToolsService } from '../../services/Tools/GetToolsService'
import { GetToolsController } from './tools/GetToolsController'
import { DeleteToolController } from './tools/DeleteToolController'
import { DeleteToolService } from '../../services/Tools/DeleteToolService'
import { FilterToolByTagController } from './tools/FilterToolByTagController'
import { FilterToolByTagService } from '../../services/Tools/FilterToolByTagService'

const userRepository = new UserRepository()
const toolRepository = new ToolRepository()

const createUserService = new CreateUserService(userRepository)
const logUserService = new LogUserService(userRepository)

const createToolService = new CreateToolService(toolRepository)
const getToolsService = new GetToolsService(toolRepository)
const deleteToolService = new DeleteToolService(toolRepository)
const filterToolByTagService = new FilterToolByTagService(toolRepository)

const createToolController = new CreateToolController(createToolService)
const getToolsController = new GetToolsController(getToolsService)
const deleteToolController = new DeleteToolController(deleteToolService)
const filterToolByTagController = new FilterToolByTagController(filterToolByTagService)

const registerController = new RegisterController(createUserService)
const issueTokensController = new IssueTokensController(logUserService)

export {
  registerController,
  issueTokensController,
  createToolController,
  getToolsController,
  deleteToolController,
  filterToolByTagController
}