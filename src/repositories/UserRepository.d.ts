import { User } from "@prisma/client";

interface IUserRepository {
  registerUser(user: Omit<User, 'createdAt' | 'id'>): Promise<Omit<User, 'createdAt' | 'password'> | object>
  findUser(email: string): Promise<User | null>
}