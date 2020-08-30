import {getRepository, Repository, Not} from 'typeorm';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

import User from '@modules/user/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {email},
        });

        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create(userData);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
