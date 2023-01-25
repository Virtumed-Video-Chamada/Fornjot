import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';
import Clinic from '@modules/clinic/infra/typeorm/entities/Clinic';

@Entity("pacient")
class Pacient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rg: string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    number: string;

    @Column()
    state: string;

    @Column()
    district: string;

    @Column()
    city: string;

    @OneToOne(() => Pacient, pacient => pacient.user)
    user: User;

    @ManyToMany(() => Clinic, clinic => clinic.pacients)
    @JoinTable()
    clinics?: Clinic[];

    @OneToMany(() => FavoriteDoctor, favoriteDoctor => favoriteDoctor.doctors)
    @JoinColumn()
    favoriteDoctor?: FavoriteDoctor[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pacient;
