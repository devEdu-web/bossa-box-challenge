import { UserRepository } from '../../repositories/UserRepository'
import { ToolRepository } from '../../repositories/ToolRepository'

import { RegisterController } from '../controllers/auth/RegisterController'
import { IssueTokensController } from '../controllers/auth/issueTokensController'

import { CreateToolController } from '../controllers/tools/CreateToolController'

import { CreateUserService } from '../../services/Users/CreateUserService'
import { LogUserService } from '../../services/Users/logUserService'

import { CreateToolService } from '../../services/Tools/CreateToolService'

const userRepository = new UserRepository()
const toolRepository = new ToolRepository()

const createUserService = new CreateUserService(userRepository)
const logUserService = new LogUserService(userRepository)

const createToolService = new CreateToolService(toolRepository)
const createToolController = new CreateToolController(createToolService)

const registerController = new RegisterController(createUserService)
const issueTokensController = new IssueTokensController(logUserService)

export {
  registerController,
  issueTokensController,
  createToolController
}