import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import Pacient from '../../../../pacient/infra/typeorm/entities/Pacient';

@Entity("favorite")
class FavoriteDoctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    doctorsId: string[];

    @OneToMany(() => Doctor, doctor => doctor.id)
    @JoinColumn()
    doctors: Doctor[];

    @ManyToOne(() => Pacient)
    pacient: Pacient;
}

export default FavoriteDoctor;
