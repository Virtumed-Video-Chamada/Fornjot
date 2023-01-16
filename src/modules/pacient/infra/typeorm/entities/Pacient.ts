import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pacient;
