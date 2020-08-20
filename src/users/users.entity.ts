import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;
}