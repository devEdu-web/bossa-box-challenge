import { RegisterController } from '../controllers/auth/RegisterController'
import { UserRepository } from '../../repositories/UserRepository'
import { CreateUserService } from '../../services/Users/CreateUserService'

const userRepository = new UserRepository()
const createUserService = new CreateUserService(userRepository)
const registerController = new RegisterController(createUserService)

export {
  registerController
}