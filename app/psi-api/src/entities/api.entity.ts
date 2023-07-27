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
export class site_list_db {
  @PrimaryGeneratedColumn()
  id: number

  @Column('enum', {enum: DeviceType, nullable: false })
  device: DeviceType
  @Column('varchar', { length: 50, nullable: false })
  name?: string
  @Column('varchar', { length: 50, nullable: false })
  url: string
  @Column('datetime',{
    default: () => 'NOW()',
  })
  date: Date
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
}