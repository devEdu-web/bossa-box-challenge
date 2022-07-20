import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateUserService {
  constructor(
    private UserRepository: UserRepository,
  ) {}

  async execute(user: Omit<User, 'createdAt' | 'id'>) {
    try {
      const userSaved = await this.UserRepository.registerUser(user)
      return userSaved
    } catch (error) {
      throw new Error('Email already exists.')
    }
  }

}