import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeUserTypesRepository from '@modules/user/repositories/fakes/FakeUserTypesRepository';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserAsAdminService from '@modules/user/services/CreateUserAsAdminService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTypesRepository: FakeUserTypesRepository;
let fakeHashProvider: FakeHashProvider;
let createUserAsAdmin: CreateUserAsAdminService;

describe('CreateUserAsAdmin', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTypesRepository = new FakeUserTypesRepository();
        fakeHashProvider = new FakeHashProvider();
        createUserAsAdmin = new CreateUserAsAdminService(
            fakeUsersRepository,
            fakeUserTypesRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserAsAdmin.execute({
            email: 'doe@gmail.com',
            name: 'John',
            password: '123456',
            surname: 'Doe',
            token: process.env.ADMIN_TOKEN as string,
            type: 'student',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user for invalid token', async () => {
        await expect(
            createUserAsAdmin.execute({
                email: 'john@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                token: 'INVALID',
                type: 'student',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user with same e-mail from another', async () => {
        await createUserAsAdmin.execute({
            email: 'doe@gmail.com',
            name: 'John',
            password: '123456',
            surname: 'Doe',
            token: process.env.ADMIN_TOKEN as string,
            type: 'student',
        });

        await expect(
            createUserAsAdmin.execute({
                email: 'doe@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                token: process.env.ADMIN_TOKEN as string,
                type: 'student',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new user with invalid type', async () => {
        await expect(
            createUserAsAdmin.execute({
                email: 'doe@gmail.com',
                name: 'John',
                password: '123456',
                surname: 'Doe',
                token: process.env.ADMIN_TOKEN as string,
                type: 'INVALID',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
