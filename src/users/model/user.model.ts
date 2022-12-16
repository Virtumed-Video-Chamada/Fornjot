import { Role } from '@prisma/client';

export interface User {
    id?: string;
    email: string;
    password: string;
    avatar: string;
    role?: Role;
    createdAt?: Date;
    updateAt?: Date;
}
