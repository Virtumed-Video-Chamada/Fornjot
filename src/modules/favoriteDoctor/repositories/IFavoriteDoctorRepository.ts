import { FavoriteDoctorDto } from '../dtos/ICreateFavoriteDoctorDto';
import FavoriteDoctor from '../infra/typeorm/entities/FavoriteDoctor';

export default interface IFavoriteDoctorsRepository {
    addOurRemoveFavoriteDoctor(
        pacient_id: string,
        doctor_id: string,
        data: FavoriteDoctorDto,
    ): Promise<FavoriteDoctor | undefined>;

}
