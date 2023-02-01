import { ICreateFavoriteDoctorDto } from '../dtos/ICreateFavoriteDoctorDto';
import FavoriteDoctor from '../infra/typeorm/entities/FavoriteDoctor';

export default interface IFavoriteDoctorsRepository {
    addFavoriteDoctor({
        doctor_id,
    }: ICreateFavoriteDoctorDto): Promise<FavoriteDoctor>;
    remove({ doctor_id }: ICreateFavoriteDoctorDto): Promise<void>;
    findFavorites(): Promise<FavoriteDoctor[]>
}
