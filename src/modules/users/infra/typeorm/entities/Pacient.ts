import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
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

  @OneToOne(type => User)
  user: User;
}

export default Pacient
