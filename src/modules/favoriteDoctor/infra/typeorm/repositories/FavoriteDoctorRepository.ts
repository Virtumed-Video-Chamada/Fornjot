import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import { Repository } from 'typeorm';
import FavoriteDoctor from '../entities/FavoriteDoctor';
import AppError from '@shared/errors/AppError';

class FavoriteDoctorsRepository implements IFavoriteDoctorsRepository {
    private ormRepository: Repository<FavoriteDoctor>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(FavoriteDoctor);
    }

    public async addFavoriteDoctor(doctor_id: string): Promise<FavoriteDoctor> {
        const favorite = this.ormRepository.create({
            doctor_id,
        });

        await this.ormRepository.save(favorite);

        return favorite;
    }

    public async remove(doctor_id: string): Promise<void> {
        const favorite = await this.ormRepository.find({
            where: { doctor_id },
        });
        if (!favorite) {
            throw new AppError('Add one doctor');
        }

        await this.ormRepository.remove(favorite)
    }
}

export default FavoriteDoctorsRepository;
