import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/App.Error';
import IUsersRepository from '../repositories/IUsersRepository';

import { User } from '@model/user.model';

interface IRequest {
    email: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ email }: IRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User not Found');
        }

        return user;
    }
}

export default ShowProfileService;
