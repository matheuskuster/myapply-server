import {Router} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import UsersController from '@modules/user/infra/http/controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            surname: Joi.string().required(),
            type: Joi.string(),
        },
    }),
    usersController.create,
);

usersRouter.post(
    '/admin',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            surname: Joi.string().required(),
            token: Joi.string().required(),
            type: Joi.string(),
        },
    }),
    usersController.createAsAdmin,
);

export default usersRouter;
