import 'reflect-metadata';

import { User } from '@model/user.model';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import PrismaService from '@shared/infra/prisma/prisma.client';

class UserRepository implements IUsersRepository {
    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: false,
        createdAt: true,
        updateAt: true,
    };

    constructor(private readonly prisma: PrismaService) {}

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                email: userData.email,
                password: userData.password,
                role: 'Admin',
            },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
            select: this.userSelect,
        });

        return user;
    }

    // public async findAllProviders({
    //     except_user_id,
    // }: IFindAllProvidersDTO): Promise<User[]> {
    //     let users: User[];
    //     if (except_user_id) {
    //         users = await this.ormRepository.find({
    //             where: {
    //                 id: Not(except_user_id),
    //             },
    //         });
    //     } else {
    //         users = await this.ormRepository.find();
    //     }

    //     return users;
    // }

    // public async findById(id: string): Promise<User | undefined> {
    //     return this.ormRepository.findOne(id);
    // }
}

export default UserRepository;
