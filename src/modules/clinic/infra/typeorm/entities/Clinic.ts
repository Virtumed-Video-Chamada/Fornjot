import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";
import Doctor from '@modules/doctor/infra/typeorm/entities/Doctor';

@Entity()
class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  corporate_name: string;

  @Column("varchar")
  cnpj: string;

  @Column("varchar")
  cpf: string;

  @Column("varchar")
  cep: string;

  @Column("varchar")
  address: string;

  @Column("varchar")
  number: string;

  @Column("varchar")
  district: string;

  @Column("varchar")
  city: string;

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
