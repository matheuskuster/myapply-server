import {Response, Request} from 'express';
import {container} from 'tsyringe';
import {hash} from 'bcryptjs';
import {classToClass} from 'class-transformer';

import CreateUserService from '@modules/user/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {name, surname, email, password} = request.body;

        const createUser = container.resolve(CreateUserService);

        const hashedPassword = await hash(password, 8);

        const user = await createUser.execute({
            email,
            name,
            password: hashedPassword,
            surname,
        });

        return response.json(classToClass(user));
    }
}
