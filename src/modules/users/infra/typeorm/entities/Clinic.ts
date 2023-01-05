import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Doctor from './Doctor';

@Entity()
class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crm: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @OneToMany(() => Doctor, doctor => doctor.clinic)
  doctors: Doctor[];

  @OneToOne(type => User)
  user: User;
}

export default Clinic
