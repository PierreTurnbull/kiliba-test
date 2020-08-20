import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;
}