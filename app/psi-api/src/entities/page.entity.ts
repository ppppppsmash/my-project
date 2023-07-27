import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 50, nullable: false })
  deivice: string
  @Column('varchar', { length: 50, nullable: false })
  name?: string
  @Column('varchar', { length: 50, nullable: false })
  url: string
  @Column('varchar', { length: 50, nullable: false })
  date?: string
  @Column('varchar', { length: 50, nullable: false })
  label?: string
  @Column('varchar', { length: 50, nullable: false })
  lcp?: string
  @Column('varchar', { length: 50, nullable: false })
  fid?: string
  @Column('varchar', { length: 50, nullable: false })
  cls?: string
  @Column('varchar', { length: 50, nullable: false })
  fcp?: string
  @Column('varchar', { length: 50, nullable: false })
  tbt?: string
  @Column('varchar', { length: 50, nullable: false })
  si?: string

  @Column('int', { nullable: false })
  score: number

  @CreateDateColumn()
  createdAt?: string

  @UpdateDateColumn()
  updatedAt?: string
}