import User from '@modules/users/infra/typeorm/entities/User';
import ICreateMedicalRecordDTO from '../dtos/ICreateMedicalRecord';
import MedicalRecord from '../infra/typeorm/entities/MedicalRecord';

export default interface IMedicalRecordRepository {
    createMedicalRecord(data: ICreateMedicalRecordDTO): Promise<MedicalRecord | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    save(user: User): Promise<User>;
}
