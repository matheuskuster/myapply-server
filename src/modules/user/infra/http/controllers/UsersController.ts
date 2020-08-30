import {Response, Request} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

import CreateUserService from '@modules/user/services/CreateUserService';
import CreateUserAsAdminService from '@modules/user/services/CreateUserAsAdminService';

const DEFAULT_USER_TYPE = 'student';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const {name, surname, email, password, type} = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            email,
            name,
            password,
            surname,
            type: type ?? DEFAULT_USER_TYPE,
            user_id,
        });

        return response.json(classToClass(user));
    }

    public async createAsAdmin(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {name, surname, email, password, type, token} = request.body;

        const createUserAsAdmin = container.resolve(CreateUserAsAdminService);

        const user = await createUserAsAdmin.execute({
            email,
            name,
            password,
            surname,
            token,
            type: type ?? DEFAULT_USER_TYPE,
        });

        return response.json(classToClass(user));
    }
}
