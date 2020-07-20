import { Repository, getRepository } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '@modules/users/infra/typeorm/entities/User'

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findAll(): Promise<User[]> {
        return await this.ormRepository.find()
    }

    public async findById(id: string): Promise<User | undefined> {
        const userFound = await this.ormRepository.findOne(id)
        return userFound
    }

    public async findByLogin(login: string): Promise<User | undefined> {
        const userFound = await this.ormRepository.findOne({
            where: [{ username: login }, { email: login }],
        })

        return userFound
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData)

        await this.ormRepository.save(user)

        return user
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user)
    }
}

export default UsersRepository
