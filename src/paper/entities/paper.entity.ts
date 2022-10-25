import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Paper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  img: string;

  @Column({ type: 'varchar', length: 510 })
  authors: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  venue: string;

  @Column({ type: 'varchar', length: 255 })
  href: string;

  @Column({ type: 'timestamp' })
  published_at: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_date: string;
}
