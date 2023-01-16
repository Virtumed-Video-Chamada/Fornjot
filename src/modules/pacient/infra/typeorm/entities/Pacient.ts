import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import FavoriteDoctor from '@modules/favoriteDoctor/infra/typeorm/entities/FavoriteDoctor';

@Entity()
class Pacient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    rg: string;

    @Column({ type: 'varchar' })
    cpf: string;

    @Column({ type: 'varchar' })
    cep: string;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'varchar' })
    number: string;

    @Column({ type: 'varchar' })
    state: string;

    @Column({ type: 'varchar' })
    district: string;

    @Column({ type: 'varchar' })
    city: string;

    @OneToOne(() => User)
    user: User;

    @OneToMany(() => FavoriteDoctor, favoriteDoctor => favoriteDoctor.doctors)
    @JoinColumn()
    favoriteDoctor: FavoriteDoctor[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pacient;
