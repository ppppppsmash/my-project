import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  body: string

  @CreateDateColumn()
  createdAt?: string

  @UpdateDateColumn()
  updatedAt?: string

  constructor(body: string) {
    this.body = body
  }
}