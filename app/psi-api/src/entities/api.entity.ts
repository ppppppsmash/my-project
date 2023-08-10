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
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date
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

// npx typeorm-ts-node-commonjs migration:generate src/migration/CommentMigration -d src/data-source.ts
// npm run build
// npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
