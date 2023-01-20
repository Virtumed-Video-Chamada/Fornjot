import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAdiminRepository from '@modules/admin/repositories/IAdminRepository';

interface IRequestDelete {
    id: string;
}

@injectable()
class DeleteUsersService {
    constructor(
        @inject('AdminsRepository')
        private usersRepository: IAdiminRepository,
    ) {}

    public async delete({
        id,
    }: IRequestDelete): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('E-mail do not exists');
        }

        await this.usersRepository.delete(id);

    }
}

export default DeleteUsersService;
