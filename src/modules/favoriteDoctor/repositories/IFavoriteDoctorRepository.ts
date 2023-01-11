import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import FavoriteDoctor from '../infra/typeorm/entities/FavoriteDoctor';

export default interface IPacientRepository {
    addFavoriteDoctor(pacient_id: string, doctor_id: string): Promise<FavoriteDoctor[]>;
    removeFavoriteDoctor(pacient_id: string, doctor_id: string): Promise<FavoriteDoctor[]>;
}
