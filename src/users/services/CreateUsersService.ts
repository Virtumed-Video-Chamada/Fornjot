import { User } from '../model/user.model';
import CreateUserDto from '../dtos/CreateUsersDtos';
import prisma from '../../database/prisma.client';

class CreateUsersService {
    private userSelect = {
        id: true,
        email: true,
        password: false,
        role: false,
        avatar: true,
        createdAt: true,
        updateAt: true,
    };

    async newClinic(dto: CreateUserDto): Promise<User> {
        const newClinic = await prisma.user.create({
            data: {
                email: dto.email,
                role: 'Clinic',
                password: dto.password,
                avatar: dto.avatar,
            },
            select: this.userSelect,
        });
        return newClinic;
    }

    async newPacient(dto: CreateUserDto): Promise<User> {
        const newPacient = await prisma.user.create({
            data: {
                email: dto.email,
                role: 'Pacient',
                password: dto.password,
                avatar: dto.avatar,
            },
            select: this.userSelect,
        });
        return newPacient;
    }

    async newDcotor(dto: CreateUserDto): Promise<User> {
        const newDcotor = await prisma.user.create({
            data: {
                email: dto.email,
                role: 'Doctor',
                password: dto.password,
                avatar: dto.avatar,
            },
            select: this.userSelect,
        });
        return newDcotor;
    }

    async validPassword(dto: CreateUserDto) {
        if (dto.password != dto.confirmPassword) {
            throw new Error('As senhas informadas não são iguais.');
        }

        delete dto.confirmPassword;
    }

    public async createClinic(dto: CreateUserDto): Promise<User> {
        await this.validPassword(dto);
        const newClinic = await this.newClinic(dto);
        return newClinic;
    }

    public async createPacient(dto: CreateUserDto): Promise<User> {
        await this.validPassword(dto);
        const newPacient = await this.newPacient(dto);
        return newPacient;
    }
    public async createDoctor(dto: CreateUserDto): Promise<User> {
        await this.validPassword(dto);
        const newDcotor = await this.newDcotor(dto);
        return newDcotor;
    }
}

export default CreateUsersService;
