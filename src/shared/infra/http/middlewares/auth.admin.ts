import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import { PostgresDataSource } from '@shared/infra/typeorm';

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function authAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    const ormRepository = PostgresDataSource.getRepository(User);

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as ITokenPayload;

        request.user = {
            id: sub,
        };

        ormRepository.findOne({
            where: {
                id: request.user.id
            }
        }).then(user => {
            if(!user){
                throw new AppError('Unauthorized', 401);
            }
            if (user.role !== "ADMIN") {
                throw new AppError('Unauthorized', 401);
            }
            request.user = user;
            return next();
        }).catch(error => {
            throw new AppError(error.message, 401);
        });

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token', 401);
    }
}
