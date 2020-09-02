import {v4 as uuid} from 'uuid';

import User from '@modules/user/infra/typeorm/entities/User';
import FakeUserTypesRepository from '@modules/user/repositories/fakes/FakeUserTypesRepository';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import ICreateUser from '@modules/user/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [
        {
            created_at: new Date(),
            email: 'admin@myapply.com',
            id: 'admin',
            name: 'Administrador',
            password: uuid(),
            surname: 'do Sistema',
            type: {
                admin: true,
                created_at: new Date(),
                id: '3',
                slug: 'admin',
                updated_at: new Date(),
                users: [],
            },
            type_id: '3',
            updated_at: new Date(),
        },
    ];

    constructor(
        private fakeUserTypesRepository = new FakeUserTypesRepository(),
    ) {}

    public async findById(id: string): Promise<User | undefined> {
        const foundUser = this.users.find((user) => user.id === id);

        return foundUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const foundUser = this.users.find((user) => user.email === email);

        return foundUser;
    }

    public async create(data: ICreateUser): Promise<User> {
        const user = new User();

        const type = await this.fakeUserTypesRepository.findById(
            data.type_id as string,
        );

        Object.assign(user, {id: uuid(), type}, data);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const foundIndex = this.users.findIndex(
            (findUser) => findUser.id === user.id,
        );

        this.users[foundIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;
