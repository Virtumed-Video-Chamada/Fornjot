import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IDoctorRepository from '@modules/doctor/repositories/IDoctorRepository';
import DoctorsRepository from '@modules/doctor/infra/typeorm/repositories/DoctorsRepository';

import IClinicRepository from '@modules/clinic/repositories/IClinicsRepository';
import ClinicsRepository from '@modules/clinic/infra/typeorm/repositories/ClinicsRepository';

import IPacientRepository from '@modules/pacient/repositories/IPacientRepository';
import PacientsRepository from '@modules/pacient/infra/typeorm/repositories/PacientsRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IDoctorRepository>(
    'DoctorsRepository',
    DoctorsRepository,
);

container.registerSingleton<IClinicRepository>(
    'ClinicsRepository',
    ClinicsRepository,
);

container.registerSingleton<IPacientRepository>(
    'PacientsRepository',
    PacientsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    'UserTokensRepository',
    UsersTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
