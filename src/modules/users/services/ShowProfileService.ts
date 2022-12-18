import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/App.Error';
import IUsersRepository from '../repositories/IUsersRepository';

import { User } from '@model/user.model';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not Found');
        }

        delete user.password;

        return user;
    }
}

export default ShowProfileService;
