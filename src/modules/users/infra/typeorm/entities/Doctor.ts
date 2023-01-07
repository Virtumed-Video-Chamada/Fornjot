import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Clinic from './Clinic';

@Entity()
class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: 'varchar'})
  crm: string;

  @Column({type: 'varchar'})
  cpf: string;

  @Column({type: 'varchar'})
  cep: string;

  @ManyToMany(() => Clinic, clinic => clinic.doctors)
  clinic: Clinic;

  @OneToOne(type => Doctor, doctor => doctor.user)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor
