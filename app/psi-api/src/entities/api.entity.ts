import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DeviceType {
  Desktop = 'desktop',
  Mobile = 'mobile'
}

@Entity()
export class site_list {
  @PrimaryGeneratedColumn()
  id: number

  @Column('enum', {enum: DeviceType, nullable: true })
  device: DeviceType
  @Column('varchar', { length: 50, nullable: true })
  name?: string
  @Column('varchar', { length: 50, nullable: true })
  url: string
  @Column('varchar', { length: 10, nullable: true })
  schedule: string
  @Column('datetime',{
    default: () => 'NOW()',
  })
  date: Date
  @Column('varchar', { length: 50, nullable: true })
  lcp?: string
  @Column('varchar', { length: 50, nullable: true })
  fid?: string
  @Column('varchar', { length: 50, nullable: true })
  cls?: string
  @Column('varchar', { length: 50, nullable: true })
  fcp?: string
  @Column('varchar', { length: 50, nullable: true })
  tbt?: string
  @Column('varchar', { length: 50, nullable: true })
  si?: string
  @Column('int', { nullable: true })
  score: number
}