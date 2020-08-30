import {getRepository, Repository} from 'typeorm';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

import User from '@modules/user/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id, {
            relations: ['type'],
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            relations: ['type'],
            where: {email},
        });

        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
