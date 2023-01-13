import { Repository, Not, UpdateResult } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import { PostgresDataSource } from '@shared/infra/typeorm/index';

import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
    }

    public async updateDoctor(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['doctor'],
        });

        return user;
    }

    public async updateClinic(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['doctor'],
        });

        return user;
    }

    public async updatePacient(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['doctor'],
        });

        return user;
    }

    public async findAllDoctors(): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                role: 'DOCTOR',
            },
        });

        return user;
    }

    public async findAllPacients(): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                role: 'PACIENT',
            },
        });

        return user;
    }

    public async findAllClinics(): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                role: 'CLINIC',
            },
        });

        return user;
    }

    public async findById(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined | null> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findAllProviders({
        expect_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];

        if (expect_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(expect_user_id),
                },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }


    public async createDoctor(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'DOCTOR',
            doctor: {
                id: uuid(),
                cep: '',
                cpf: '',
                crm: '',
                address: '',
                city: '',
                district: '',
                number: ''
            }
        });


        await this.ormRepository.save(user);

        return user;
    }

    public async createPacient(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'PACIENT',
            pacient: {
                id: uuid(),
                rg: '',
                cep: '',
                cpf: '',
                address: '',
                city: '',
                district: '',
                number: ''
            }
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async createClinic(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'CLINIC',
            clinic: {
                id: uuid(),
                corporate_name: '',
                cnpj: '',
                cep: '',
                cpf: '',
                address: '',
                city: '',
                district: '',
                number: '',
            }
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
