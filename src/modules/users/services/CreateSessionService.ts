import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

interface Request {
    login: string
    password: string
}

interface Response {
    user: User
    token: string
}

class CreateSessionService {
    private DEFAULT_ERROR_MESSAGE = 'Invalid credentials. Please try again.'

    public async execute({ login, password }: Request): Promise<Response> {
        const userRepository = getRepository(User)

        const user = await userRepository.findOne({
            where: [{ username: login }, { email: login }],
        })

        if (!user) {
            throw new AppError(this.DEFAULT_ERROR_MESSAGE, 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError(this.DEFAULT_ERROR_MESSAGE, 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default CreateSessionService