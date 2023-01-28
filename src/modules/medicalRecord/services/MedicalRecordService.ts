/* import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMedicalRecordRepository from '../repositories/IMedicalRecord';
import MedicalRecord from '../infra/typeorm/entities/MedicalRecord';

@injectable()
class InfoPacientService {
    constructor(
        @inject('MedicalRecordRepository')
        private usersRepository: IMedicalRecordRepository,
    ) {}

    public async executeForPatient(id: string): Promise<MedicalRecord[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const user = await this.usersRepository.(id);

        return user;
    }

    public async executeForDoctor(id: string): Promise<MedicalRecord[] | null> {
        const infoUser = await this.usersRepository.findById(id);

        if (!infoUser) {
            throw new AppError('User do not exists');
        }

        const user = await this.usersRepository.(id);

        return user;
    }
}
export default InfoPacientService;
 */
