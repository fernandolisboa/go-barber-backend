import { Request, Response } from 'express'
import { container } from 'tsyringe'

import FindAllUsersService from '@modules/users/services/FindAllUsersService'
import CreateUserService from '@modules/users/services/CreateUserService'

class UsersController {
    public async index(
        _request: Request,
        response: Response,
    ): Promise<Response> {
        const findAllUsers = container.resolve(FindAllUsersService)
        const users = await findAllUsers.execute()

        users.forEach(user => delete user.password)

        return response.json(users)
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body

        const createUser = container.resolve(CreateUserService)

        const user = await createUser.execute({
            name,
            email,
            password,
        })

        delete user.password

        return response.json(user)
    }
}

export default UsersController
