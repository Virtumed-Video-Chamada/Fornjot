import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Clinic from '@modules/clinic/infra/typeorm/entities/Clinic';

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

  @Column({type: 'varchar'})
  address: string;

  @Column({type: 'varchar'})
  number: string;

  @Column({type: 'varchar'})
  district: string;

  @Column({type: 'varchar'})
  city: string;

  @ManyToMany(() => Clinic, clinic => clinic.doctors)
  clinic: Clinic;

  @OneToOne(() => Doctor, doctor => doctor.user)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor
