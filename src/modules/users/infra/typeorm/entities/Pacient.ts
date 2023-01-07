import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from "@modules/users/infra/typeorm/entities/User";

@Entity()
class Pacient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  crm: string;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @OneToOne(() => User)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pacient
