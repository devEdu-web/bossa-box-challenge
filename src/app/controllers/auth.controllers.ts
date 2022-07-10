import { Request, Response } from 'express'
import Utils from '../../utils/Utils'
import client from '../../database/client'
import config from '../../config/default'

interface registerUserPayload {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

interface issueTokensPayload {
  email: string,
  password: string
}

class AuthController {
  public async registerUser(req: Request<{}, {}, registerUserPayload>, res: Response): Promise<Response> {
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
      Utils.log.info('New user inserted into database successfully.')
      return res.status(201).json(savedUser)
    } catch (error) {
      // Assuming the error was due to duplicate key (email)
      Utils.log.info('Attempt to register user failed.')
      return res.status(400).json({
        error: 'Email already in use.'
      })
    }
  }

  public async issueTokensController(req: Request<{}, {}, issueTokensPayload>, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      const user = await client.user.findUnique({
        where: {
          email: email
        }
      })
      const isPasswordValid = await Utils.verifyPassword(password, user?.password)
      if(!user || !isPasswordValid) return res.json({error: 'Email or password invalid.'})

      const accessToken = Utils.signJwt(req.body, {
        expiresIn: config.accessTokenTtl
      })

      const refreshToken = Utils.signJwt(req.body, {
        expiresIn: config.refreshTokenTtl
      })

      console.log(accessToken)

      return res.status(200).json({
        accessToken,
        refreshToken
      })

    } catch (error: any) {
      console.log(error)
      return res.status(500).json({
        error: error.message
      })
    }

  }

}


export default new AuthController()