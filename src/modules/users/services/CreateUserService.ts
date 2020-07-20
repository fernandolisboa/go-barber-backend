import { injectable, inject } from 'tsyringe'
import { hash } from 'bcryptjs'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

type Request = Pick<User, 'name' | 'email' | 'password'>

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: Request): Promise<User> {
        const existsUser = await this.usersRepository.findByLogin(email)

        if (existsUser) {
            throw new AppError('This email is already in use.')
        }

        const hashedPassword = await hash(password, 8)

        const username = email.substring(0, email.indexOf('@'))

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password: hashedPassword,
        })

        return user
    }
}

export default CreateUserService
