import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IPacientRepository {
    updatePacient(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createPacient(data: ICreateUserDTO): Promise<User>;
    findAllPacients(): Promise<User[] | null>;
    addFavoriteDoctor(doctor_id: string, pacient_id: string): Promise<void>;
    removeFavoriteDoctor(doctor_id: string, pacient_id: string): Promise<void>;
    save(user: User): Promise<User>;
}
