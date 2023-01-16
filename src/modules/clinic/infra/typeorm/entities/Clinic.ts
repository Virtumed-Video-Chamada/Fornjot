import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';

@Entity()
class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({type: 'varchar'})
  razao: string;

  @Column({type: 'varchar'})
  cnpj: string;

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

  @Column({type: 'varchar'})
  state: string;

  @ManyToMany(() => Doctor, doctor => doctor.clinics)
  @JoinTable()
  doctors?: Doctor[];

  @OneToOne(() => Clinic, clinic => clinic.user)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Clinic
