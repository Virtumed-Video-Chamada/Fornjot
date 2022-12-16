import 'reflect-metadata';

import { User } from '@model/user.model';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    // findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
    // findById(id: string): Promise<User | undefined>;
}
