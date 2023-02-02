import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IFindAllAppointments from '../dtos/IFindAllAppointmentsDTO';

export default interface IAppointmentsRepository {
    findAllIAppointmentForDoctor({
        provider_id,
    }: IFindAllAppointments): Promise<Appointment[]>;
    findAllIAppointmentForPatient({
        provider_id,
    }: IFindAllAppointments): Promise<Appointment[]>
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined | null>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
    delete(appointment_id: string): Promise<void>;
}
