import {Response, Request} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

import CreateUserService from '@modules/user/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {name, surname, email, password} = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            email,
            name,
            password,
            surname,
        });

        return response.json(classToClass(user));
    }
}
