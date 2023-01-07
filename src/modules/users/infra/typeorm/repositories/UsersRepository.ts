import { Repository, Not, UpdateResult } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import { PostgresDataSource } from '@shared/infra/typeorm/index';
import IUpdateUserDoctorDto from '@modules/users/dtos/IUpdateDoctor';

import User from '../entities/User';
import Doctor from '../entities/Doctor';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;
    private ormDoctorRepository: Repository<Doctor>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
        this.ormDoctorRepository = PostgresDataSource.getRepository(Doctor);
    }

    public async updateDoctor(
        data: IUpdateUserDoctorDto,
    ): Promise<UpdateResult | null> {
        const user = await this.ormRepository.update(
            {
                id: data.user_id,
            },
            {
                doctor: {
                    cpf: data.cpf,
                    cep: data.cep,
                    crm: data.crm,
                },
            },
        );

        return user;
    }

    public async findDoctors(id: string): Promise<User | null> {
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


    // public async createIdDoctor(): Promise<Doctor> {
    //     const doctor = this.ormDoctorRepository.create({
    //             cpf: '',
    //             cep: '',
    //             crm: '',
    //     })

    //     return doctor
    // }


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
                crm: ''
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
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
