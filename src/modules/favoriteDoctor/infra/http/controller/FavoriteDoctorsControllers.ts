import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import CreatefavoriteDoctorsService from '@modules/favoriteDoctor/service/create/CreateFavoriteDoctor';
import { FavoriteDoctorDto } from '@modules/favoriteDoctor/dtos/ICreateFavoriteDoctorDto';

export default class favoriteDoctorssController {
    public async create(
        request: Request,
        response: Response,
        data: FavoriteDoctorDto,
    ): Promise<Response> {
        const { pacient_id, doctor_id } = request.body;

        const createUser = container.resolve(CreatefavoriteDoctorsService);

        const user = await createUser.execute({
            pacient_id,
            doctor_id,
            data,
        });

        return response.json(instanceToInstance(user));
    }
}
