import 'reflect-metadata';

import {sign} from 'jsonwebtoken';
import authConfig from '@config/auth';
import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect e-mail/password combination.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect e-mail/password combination.', 401);
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            expiresIn,
            subject: user.id,
        });

        return {token, user};
    }
}

export default AuthenticateUserService;
