import 'reflect-metadata';
import { container } from 'tsyringe';

import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.executeAdmin({
            email,
            password,
        });

        return response.json(instanceToInstance(user));
    }
}
