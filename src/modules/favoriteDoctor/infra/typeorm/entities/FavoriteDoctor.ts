import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import {
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import Pacient from '../../../../pacient/infra/typeorm/entities/Pacient';

@Entity()
class FavoriteDoctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Doctor, doctor => doctor.id)
    @JoinColumn()
    doctors: Doctor[];

    @ManyToOne(() => Pacient)
    pacient: Pacient;
}

export default FavoriteDoctor;
