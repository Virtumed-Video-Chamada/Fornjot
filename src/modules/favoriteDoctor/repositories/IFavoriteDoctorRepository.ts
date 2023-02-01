import { FavoriteDoctorDto } from '../dtos/ICreateFavoriteDoctorDto';
import FavoriteDoctor from '../infra/typeorm/entities/FavoriteDoctor';

export default interface IFavoriteDoctorsRepository {
    addFavoriteDoctor(
        doctor_id: string,
    ): Promise<FavoriteDoctor>;
    remove(doctor_id:string):Promise<void>;
}
