import {container} from 'tsyringe';

import '@modules/user/providers';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

import IUserTypesRepository from '@modules/user/repositories/IUserTypesRepository';
import UserTypesRepository from '@modules/user/infra/typeorm/repositories/UserTypesRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTypesRepository>(
    'UserTypesRepository',
    UserTypesRepository,
);
