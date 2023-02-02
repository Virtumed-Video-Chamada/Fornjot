import FavoriteDoctorService from '@modules/favoriteDoctor/service/FavoriteDoctorService';
import CreateFavoriteDoctorsService from '@modules/favoriteDoctor/service/create/CreateFavoriteDoctor';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class favoriteDoctorssController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { doctor_id } = request.body;

        const createUser = container.resolve(CreateFavoriteDoctorsService);

        const user = await createUser.execute({
            doctor_id,
        });

        return response.json(instanceToInstance(user));
    }
    public async findFavorite(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createUser = container.resolve(FavoriteDoctorService);

        const user = await createUser.execute()

        return response.json(instanceToInstance(user));
    }
}
