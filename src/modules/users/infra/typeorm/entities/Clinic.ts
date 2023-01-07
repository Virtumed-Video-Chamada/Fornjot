import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Doctor, doctor => doctor.clinic)
  doctors: Doctor[];

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Clinic
