import 'reflect-metadata';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

//import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const email = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ email });

        return response.json(instanceToInstance(user));
    }

    // public async update(
    //     request: Request,
    //     response: Response,
    // ): Promise<Response> {
    //     const { name, email, password, old_password } = request.body;

    //     const updateUser = container.resolve(UpdateProfileService);

    //     const user = await updateUser.execute({
    //         user_id: request.user.id,
    //         name,
    //         email,
    //         old_password,
    //         password,
    //     });

    //     return response.json(instanceToInstance(user));
    // }
}
