import { injectable, inject } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  login: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  private DEFAULT_ERROR_MESSAGE = 'Invalid credentials. Please try again.'

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByLogin(login)

    if (!user) {
      throw new AppError(this.DEFAULT_ERROR_MESSAGE, 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!passwordMatched) {
      throw new AppError(this.DEFAULT_ERROR_MESSAGE, 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
