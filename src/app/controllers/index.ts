import { UserRepository } from '../../repositories/UserRepository'

import { RegisterController } from '../controllers/auth/RegisterController'
import { IssueTokensController } from '../controllers/auth/issueTokensController'

import { CreateUserService } from '../../services/Users/CreateUserService'
import { LogUserService } from '../../services/Users/logUserService'

const userRepository = new UserRepository()


const createUserService = new CreateUserService(userRepository)
const logUserService = new LogUserService(userRepository)

const registerController = new RegisterController(createUserService)
const issueTokensController = new IssueTokensController(logUserService)

export {
  registerController,
  issueTokensController
}