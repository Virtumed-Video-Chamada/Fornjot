import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDelete {
    id: string;
}
@injectable()
class DeleteAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async delete({ id }: IRequestDelete): Promise<void> {
        await this.appointmentsRepository.delete(id)
    }
}

export default DeleteAppointmentsService;
