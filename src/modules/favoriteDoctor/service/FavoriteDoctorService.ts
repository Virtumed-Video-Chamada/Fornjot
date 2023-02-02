import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {}

@injectable()
class FavoriteDoctorService {
    constructor(
        @inject('FavoriteDoctorsRepository')
        private favoritesRepository: IFavoriteDoctorsRepository,
    ) {}

    public async execute(): Promise<FavoriteDoctor[]> {
        const doctor = await this.favoritesRepository.findFavorites();
        return doctor;
    }
}

export default FavoriteDoctorService;
