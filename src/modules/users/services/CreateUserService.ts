import { inject, injectable } from 'tsyringe';
import { User } from '@model/user.model';
import AppError from '@shared/errors/App.Error';
import PrismaService from '@shared/infra/prisma/prisma.client';
import IHashProvider from '@modules/users/providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: false,
        createdAt: true,
        updateAt: true,
    };

    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
        private prisma: PrismaService,
    ) {}

    public async executeAdmin({ email, password }: IRequest): Promise<User> {
        const userExist = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userExist) {
            throw new AppError('Email address already user.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'Admin',
            },
            select: this.userSelect,
        });

        // await this.cacheProvider.invalidatePrefix('provider-list');

        return user;
    }
}

export default CreateUserService;
