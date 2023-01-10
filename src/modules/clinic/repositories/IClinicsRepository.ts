import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";

export default interface IClinicRepository {
    updateClinic(id: string): Promise<User | null>;
    findById(id: string): Promise<User | undefined | null>;
    findByEmail(email: string): Promise<User | undefined | null>;
    createClinic(data: ICreateUserDTO): Promise<User>;
    findAllClinics(): Promise<User[] | null>;
    save(user: User): Promise<User>;
}

