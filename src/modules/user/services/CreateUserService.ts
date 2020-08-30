import 'reflect-metadata';

import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
    surname: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        name,
        surname,
        email,
        password,
    }: IRequest): Promise<User> {
        const checkIfUserExists = await this.usersRepository.findByEmail(email);

        if (checkIfUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            email,
            name,
            password: hashedPassword,
            surname,
        });

        return user;
    }
}

export default CreateUserService;
