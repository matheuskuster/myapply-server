import 'reflect-metadata';

import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import IUserTypesRepository from '@modules/user/repositories/IUserTypesRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
    surname: string;
    type: string;
    token: string;
}

@injectable()
class CreateUserAsAdminService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTypesRepository')
        private userTypesRepository: IUserTypesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        surname,
        email,
        password,
        type,
        token,
    }: IRequest): Promise<User> {
        if (token !== process.env.ADMIN_TOKEN) {
            throw new AppError('Invalid admin token.', 401);
        }

        const checkIfUserExists = await this.usersRepository.findByEmail(email);

        if (checkIfUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const userType = await this.userTypesRepository.findBySlug(type);

        if (!userType) {
            throw new AppError('Invalid user type.');
        }

        const user = await this.usersRepository.create({
            email,
            name,
            password: hashedPassword,
            surname,
            type_id: userType.id,
        });

        return user;
    }
}

export default CreateUserAsAdminService;
