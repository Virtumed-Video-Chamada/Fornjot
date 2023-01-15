import { Repository } from 'typeorm';
import { PostgresDataSource } from '@shared/infra/typeorm/index';

import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IClinicRepository from '@modules/clinic/repositories/IClinicsRepository';
import ICreateClinicDTO from '@modules/clinic/dtos/ICreateClinicDTO';
import ICreateDoctorDTO from '@modules/doctor/dtos/ICreateDoctorDTO';
import { request } from 'express';

class ClinicsRepository implements IClinicRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(User);
    }

    public async updateClinic(id: string): Promise<User | null> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ['clinic'],
        });

        return user;
    }

    public async findAllClinics(): Promise<User[] | null> {
        const user = await this.ormRepository.find({
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

    public async createDoctorforClinic(userData: ICreateDoctorDTO): Promise<User> {
        const clinic_id = request.user.id;

        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'DOCTOR',
            doctor: {
                id: uuid(),
                speciality: userData.speciality,
                state: userData.state,
                cep: userData.cep,
                cpf: userData.cpf,
                crm: userData.crm,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
                clinic: {
                    id: clinic_id,
                }
            }
        });

        await this.ormRepository.save(user);
        
        return user;
    }

    public async createClinic(userData: ICreateClinicDTO): Promise<User> {
        const user = this.ormRepository.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: 'CLINIC',
            clinic: {
                id: uuid(),
                razao: userData.razao,
                cnpj: userData.cnpj,
                cep: userData.cep,
                address: userData.address,
                city: userData.city,
                district: userData.district,
                number: userData.number,
                state: userData.state,
            },
        });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default ClinicsRepository;
