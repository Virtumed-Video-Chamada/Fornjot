import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
class FavoriteDoctor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    doctor_id: string;

    @OneToMany(() => Doctor, doctor => doctor.id)
    @JoinColumn({'name': 'doctor_id'})
    doctor: Doctor[];
}

export default FavoriteDoctor;
