import { UserRepository } from "../../../repositories/UserRepository"
import { CreateUserService } from "../../../services/Users/CreateUserService"
import { LogUserService } from "../../../services/Users/logUserService"
import { IssueTokensController } from "./issueTokensController"
import { RegisterController } from "./RegisterController"

const userRepository = new UserRepository()

const createUserService = new CreateUserService(userRepository)
const logUserService = new LogUserService(userRepository)

const registerController = new RegisterController(createUserService)
const issueTokensController = new IssueTokensController(logUserService)

export {
  registerController,
  issueTokensController
}