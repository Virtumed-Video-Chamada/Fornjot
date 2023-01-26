import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Clinic from '@modules/clinic/infra/typeorm/entities/Clinic';

@Entity()
class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  crm: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: string ;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  speciality: string;

  @ManyToMany(() => Clinic, clinic => clinic.doctors)
  @JoinTable()
  clinics?: Clinic[];

  @OneToOne(() => Doctor, doctor => doctor.user)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Doctor
