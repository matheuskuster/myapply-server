import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';

import express, {Request, Response, NextFunction} from 'express';
import {errors} from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/infra/typeorm';
import '@shared/container';

function handleError(
    err: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
            status: 'error',
        });
    }

    console.error(err);

    return response.status(500).json({
        message: 'Internal server error.',
        status: 'error',
    });
}

function server() {
    const app = express();

    app.use(express.json());
    app.use(routes);

    app.use(errors());

    app.use(handleError);

    const PORT = process.env.SERVER_PORT || 3333;

    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
}

server();
