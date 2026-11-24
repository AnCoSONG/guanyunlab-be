import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'varchar', length: 20 })
  update_date: string;

  @UpdateDateColumn({ type: 'timestamp' })
  last_date: string;

  @Column({ type: 'text' })
  hypertext: string;
}
