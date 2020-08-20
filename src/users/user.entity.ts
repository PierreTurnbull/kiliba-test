import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    unique: true
  })
  username: string;
}