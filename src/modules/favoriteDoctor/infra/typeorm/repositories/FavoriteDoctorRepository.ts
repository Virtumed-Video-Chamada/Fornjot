import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import User from '../../../../users/infra/typeorm/entities/User';
import FavoriteDoctor from '../entities/FavoriteDoctor';
import { FavoriteDoctorDto } from '@modules/favoriteDoctor/dtos/ICreateFavoriteDoctorDto';
import IFavoriteDoctorsRepository from '@modules/favoriteDoctor/repositories/IFavoriteDoctorRepository';

class FavoriteDoctorsRepository implements IFavoriteDoctorsRepository {
    private ormRepository: Repository<FavoriteDoctor>;
    private ormRepositoryUser: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(FavoriteDoctor);
        this.ormRepositoryUser = PostgresDataSource.getRepository(User);
    }
    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepositoryUser.findOne({
            where: {
                id,
            },
            relations: ['pacient'],
        });

        return user;
    }

    public async addOurRemoveFavoriteDoctor(
        pacient_id: string,
        doctor_id: string,
        data: FavoriteDoctorDto,
    ): Promise<FavoriteDoctor | undefined> {
        const user = await this.findById(pacient_id);
        let favoritedDoctor = false;

        if (user?.pacient.favoriteDoctor != null) {
            user.pacient.favoriteDoctor.map(doctor => {
                if (doctor_id === doctor.id) {
                    favoritedDoctor = true;
                }
            });
        } else {
            const userSave = this.ormRepository.create({
                dotorsId: data.doctorsId,
            });
            return await this.ormRepository.save(userSave);
        }
        if(favoritedDoctor){
            const userUpdate = this.ormRepository.delete({
              doctors: data.doctorId
            })
        }

    }
}

export default FavoriteDoctorsRepository;
