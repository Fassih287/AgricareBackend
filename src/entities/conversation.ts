import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  expertId!: number;

  @Column()
  message!: string;
}
