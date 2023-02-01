import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import { Repository } from 'typeorm';
import FavoriteDoctor from '../entities/FavoriteDoctor';
import AppError from '@shared/errors/AppError';
import { ICreateFavoriteDoctorDto } from '@modules/favoriteDoctor/dtos/ICreateFavoriteDoctorDto';

class FavoriteDoctorsRepository implements IFavoriteDoctorsRepository {
    private ormRepository: Repository<FavoriteDoctor>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(FavoriteDoctor);
    }

    public async addFavoriteDoctor({
        doctor_id,
    }: ICreateFavoriteDoctorDto): Promise<FavoriteDoctor> {
        const favorite = this.ormRepository.create({
            doctor_id
        });

        await this.ormRepository.save(favorite);

        return favorite;
    }

    public async remove({
        doctor_id,
    }: ICreateFavoriteDoctorDto): Promise<void> {
        const favorite = await this.ormRepository.find({
            where: { doctor_id },
        });
        if (!favorite) {
            throw new AppError('Add one doctor');
        }

        await this.ormRepository.remove(favorite);
    }

    public async findFavorites(): Promise<FavoriteDoctor[]> {
        const favorites = await this.ormRepository.find();
        return favorites;
    }
}

export default FavoriteDoctorsRepository;
