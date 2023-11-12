import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    OneToMany,
  } from 'typeorm';
  import { SiteList } from './site_list.entity'
//   import { SiteMetrics } from './site_metrics.entity'

  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;
 
    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @OneToMany(() => SiteList, siteList => siteList.user, { cascade: true })
    siteLists: SiteList[]

    // @OneToMany(() => SiteMetrics, siteMetrics => siteMetrics.user)
    // siteMetrics: SiteMetrics[]
  }
