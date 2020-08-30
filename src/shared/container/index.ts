import {container} from 'tsyringe';

import '@modules/user/providers';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
