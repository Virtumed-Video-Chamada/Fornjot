import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/update/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ user_id });

        return response.json(instanceToInstance(user));
    }

    public async showProfileDoctor(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.showProfileDoctor({ user_id });

        return response.json(instanceToInstance(user));
    }

    public async showProfilePacient(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.showProfilePacient({ user_id });

        return response.json(instanceToInstance(user));
    }

    public async showProfileClinic(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.showProfileClinic({ user_id });

        return response.json(instanceToInstance(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;

        const updateUser = container.resolve(UpdateProfileService);

        const user = await updateUser.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        return response.json(instanceToInstance(user));
    }

    public async findByID(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.body;

        const updateUser = container.resolve(UpdateProfileService);

        const user = await updateUser.findById(id);

        return response.json(instanceToInstance(user));
    }
}
