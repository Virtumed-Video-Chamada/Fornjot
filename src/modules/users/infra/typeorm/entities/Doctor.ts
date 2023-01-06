import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Clinic from './Clinic';

@Entity()
class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  crm: string;

  @Column({type: 'varchar'})
  cpf: string;

  @Column({type: 'varchar'})
  cep: string;

  @ManyToOne(() => Clinic, clinic => clinic.doctors)
  clinic: Clinic;

  @OneToOne(type => User)
  user: User;
}

export default Doctor
