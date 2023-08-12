import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm'
import { SiteMetrics } from './site_metrics.entity'

export enum DeviceType {
  Desktop = 'desktop',
  Mobile = 'mobile'
}

@Entity()
export class SiteList {
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
  @OneToMany(() => SiteMetrics, siteMetrics => siteMetrics.siteList)
  siteMetrics: SiteMetrics[]
}

// npx typeorm-ts-node-commonjs migration:generate src/migration/PsiMigration -d src/data-source.ts
// npm run build
// npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
