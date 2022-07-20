import { User } from '@prisma/client';
import { IUserRepository } from './UserRepository.d';
import client from '../database/client';
import Utils from '../utils/Utils';

export class UserRepository implements IUserRepository {
  async registerUser(
    user: Omit<User, 'createdAt' | 'id'>
  ): Promise<Omit<User, 'createdAt' | 'password'> | object> {
    const { email, password, firstName, lastName } = user;
    try {
      const hashedPassword = await Utils.hashPassword(password);
      const savedUser = await client.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
      return savedUser;
    } catch (error) {
      throw new Error('Email already exists.');
    }
  }

  async findUser(email: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
