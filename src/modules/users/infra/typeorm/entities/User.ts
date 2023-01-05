import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Exclude, Expose } from "class-transformer";
import uploadConfig from "@config/upload"
import Doctor from "@modules/users/infra/typeorm/entities/Doctor";
import Clinic from "./Clinic";
import Pacient from "./Pacient";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  @Exclude()
  password: string;

  @Column({type: 'varchar',})
  @Exclude()
  role: string;

  @OneToOne(() => Doctor)
  @JoinColumn()
  doctor: Doctor;

  @OneToOne(() => Pacient)
  @JoinColumn()
  pacient: Doctor;

  @OneToOne(() => Clinic)
  @JoinColumn()
  clinic: Clinic;

  @Column({type: "varchar", nullable: true})
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
        return null
    }

    switch(uploadConfig.driver) {
        case 'disk':
            return `${process.env.APP_API_URL}/files/${this.avatar}`;
        case 's3':
            return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
        default:
            return null;
        }
    }
}

export default User;
