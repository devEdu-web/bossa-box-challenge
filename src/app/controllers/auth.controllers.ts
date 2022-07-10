import { Request, Response } from 'express'
import Utils from '../../utils/Utils'
import client from '../../database/client'

interface userPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

class AuthController {
  public async registerUser(req: Request<{}, {}, userPayload>, res: Response) {
    const { firstName, lastName, email, password  } = req.body

    try {
      const hashedPassword = await Utils.hashPassword(password)
      const savedUser = await client.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true
        }
      })  
      res.status(201).json(savedUser)
    } catch (error) {
      // Assuming the error was due to duplicate key (email)
      res.status(400).json({
        error: 'Email already in use.'
      })
    }

  }
}


export default new AuthController()