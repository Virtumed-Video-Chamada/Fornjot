import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { User } from '@model/user.model';
import AppError from '@shared/errors/App.Error';
import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async executeAdmin({ email, password }: IRequest): Promise<User> {
        const userExist = await this.usersRepository.findByEmail(email);

        if (userExist) {
            throw new AppError('Email address already user.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            email,
            password: hashedPassword,
        });

        // await this.cacheProvider.invalidatePrefix('provider-list');

        return user;
    }
}

export default CreateUserService;
