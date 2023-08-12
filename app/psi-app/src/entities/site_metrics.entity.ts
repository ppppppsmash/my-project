import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { SiteList } from './site_list.entity'

export enum DeviceType {
  Desktop = 'desktop',
  Mobile = 'mobile'
}

@Entity()
export class SiteMetrics {
  @PrimaryGeneratedColumn()
  id: number

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
  @ManyToOne(() => SiteList, siteList => siteList.siteMetrics)
  @JoinColumn({ name: 'site_list_id' })
  siteList: SiteList
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date
}

// npx typeorm-ts-node-commonjs migration:generate src/migration/PsiMigration -d src/data-source.ts
// npm run build
// npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
