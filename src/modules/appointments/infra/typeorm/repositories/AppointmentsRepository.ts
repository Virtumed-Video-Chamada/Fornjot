import { Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../entities/Appointment';
import { PostgresDataSource } from '@shared/infra/typeorm/index';
import AppError from '@shared/errors/AppError';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(Appointment);
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined | null> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id },
        });

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        //Formato que deve ser enviado a data ["01, 02, 03, até 12"]
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ['user'],
        });

        const cleanedAppointments = appointments.map(appointment => {
            const cleanedUser = Object.entries(appointment.user).reduce(
                (obj: { [key: string]: any }, [key, value]) => {
                    if (
                        key !== 'password' &&
                        key !== 'created_at' &&
                        key !== 'avatar' &&
                        key !== 'updated_at'
                    )
                        obj[key] = value;
                    return obj;
                },
                {},
            );
            return Object.assign({}, appointment, { user: cleanedUser });
        });

        return cleanedAppointments;
    }

    public async create({
        provider_id,
        user_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            user_id,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async delete(appointment_id: string): Promise<void> {
        const appointment = await this.ormRepository.findOne({
            where: {
                id: appointment_id
            },
        });

        if (!appointment) {
            throw new AppError('Appointment do not exists');
        }

        await this.ormRepository.remove(appointment)
    }
}

export default AppointmentsRepository;
