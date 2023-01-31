import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    doctor_id: string;
}

@injectable()
class FavoriteDoctorService {
    constructor(
        @inject('FavoriteDoctorsRepository')
        private favoritesRepository: IFavoriteDoctorsRepository,
    ) {}

    public async execute({ doctor_id }: IRequest): Promise<FavoriteDoctor> {
        await this.favoritesRepository.remove(doctor_id);

        const doctorExist = await this.favoritesRepository.addFavoriteDoctor(
            doctor_id,
        );

        return doctorExist;
    }
}

export default FavoriteDoctorService;
