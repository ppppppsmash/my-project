import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class UserHistory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  action: string

  @Column()
  site_name: string

  @Column()
  site_url: string

  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  action_date: Date
}
