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
  name: string
  @Column('varchar', { length: 50, nullable: true })
  url: string
  @Column('varchar', { length: 50, nullable: true })
  lcp?: string
  @Column('varchar', { length: 50, nullable: true })
  tti?: string
  @Column('varchar', { length: 50, nullable: true })
  cls?: string
  @Column('varchar', { length: 50, nullable: true })
  fcp?: string
  @Column('varchar', { length: 50, nullable: true })
  tbt?: string
  @Column('varchar', { length: 50, nullable: true })
  si?: string
  @Column('int', { nullable: true })
  user_fcp?: string
  @Column('int', { nullable: true })
  user_lcp?: string
  @Column('int', { nullable: true })
  user_fid?: string
  @Column('int', { nullable: true })
  user_cls?: string
  @Column('int', { nullable: true })
  user_inp?: string
  @Column('int', { nullable: true })
  user_ttfb?: string
  @Column('int', { nullable: true })
  score: number
  @ManyToOne(() => SiteList, siteList => siteList.siteMetrics)
  @JoinColumn({ name: 'site_list_id' })
  siteList: SiteList
  // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  // createdAt: Date
  // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  // updatedAt: Date
  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date
  get formattedCreatedAt(): string {
    return this.createdAt.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date
  get formattedUpdatedAt(): string {
    return this.updatedAt.toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}

// npx typeorm-ts-node-commonjs migration:generate src/migration/PsiMigration -d src/data-source.ts
// npm run build
// npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
