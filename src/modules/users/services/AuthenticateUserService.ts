import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/App.Error';

import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { User } from '@model/user.model';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute(dataAuth: IRequest): Promise<IResponse> {
        const { email, password } = dataAuth;

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const isHashValid = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!isHashValid) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        delete user.password;

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}
export default AuthenticateUserService;
