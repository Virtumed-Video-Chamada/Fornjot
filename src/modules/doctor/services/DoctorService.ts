import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';

@injectable()
class DoctorService {
    constructor(
        @inject('DoctorsRepository')
        private usersRepository: IDoctorRepository,
    ) /* @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider, */
    {}

    public async execute(): Promise<User[] | null> {
        const user = await this.usersRepository.findAllDoctors();

        return user;
    }
}
export default DoctorService;
