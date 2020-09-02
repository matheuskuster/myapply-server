import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeUserTypesRepository from '@modules/user/repositories/fakes/FakeUserTypesRepository';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/user/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTypesRepository: FakeUserTypesRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTypesRepository = new FakeUserTypesRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeUserTypesRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            email: 'doe@gmail.com',
            name: 'John',
            password: '123456',
            surname: 'Doe',
            type: 'student',
            user_id: 'admin',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with invalid type', async () => {
        await expect(
            createUser.execute({
                email: 'doe@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                type: 'INVALID',
                user_id: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user for not being admin', async () => {
        const user = await createUser.execute({
            email: 'doe@gmail.com',
            name: 'John',
            password: '123456',
            surname: 'Doe',
            type: 'student',
            user_id: 'admin',
        });

        await expect(
            createUser.execute({
                email: 'john@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                type: 'student',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user with same e-mail from another', async () => {
        await createUser.execute({
            email: 'doe@gmail.com',
            name: 'John',
            password: '123456',
            surname: 'Doe',
            type: 'student',
            user_id: 'admin',
        });

        await expect(
            createUser.execute({
                email: 'doe@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                type: 'student',
                user_id: 'admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
