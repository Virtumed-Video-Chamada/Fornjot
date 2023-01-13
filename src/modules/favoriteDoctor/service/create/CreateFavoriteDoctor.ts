import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';
import { FavoriteDoctorDto } from '@modules/favoriteDoctor/dtos/ICreateFavoriteDoctorDto';
import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';
import IPacientRepository from '@modules/pacient/repositories/IPacientRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    pacient_id: string;
    doctor_id: string;
    data: FavoriteDoctorDto;
}

@injectable()
class FavoriteDoctorService {
    constructor(
        @inject('FavoriteDoctorsRepository')
        private usersRepository: IFavoriteDoctorsRepository,
        private doctorRepository: IDoctorRepository,
    ) {}

    public async execute({
        pacient_id,
        doctor_id,
        data,
    }: IRequest): Promise<FavoriteDoctor | undefined> {
        const user = await this.doctorRepository.findById(doctor_id);
        if (user) {
            throw new AppError('Doctor already exists');
        }

        const userExist = await this.usersRepository.addOurRemoveFavoriteDoctor(
            pacient_id,
            doctor_id,
            data,
        );

        if (undefined) {
            throw new AppError('Doctor already exists');
        }

        return userExist;
    }
}

export default FavoriteDoctorService;
