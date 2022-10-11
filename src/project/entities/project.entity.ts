import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  cn_authors: string;

  @Column({ type: 'varchar', length: 255 })
  en_authors: string;

  @Column({ type: 'varchar', length: 100 })
  first_author: string;

  @Column({ type: 'varchar', length: 255 })
  cn_name: string;

  @Column({ type: 'varchar', length: 255 })
  en_name: string;

  @Column({ type: 'varchar', length: 255 })
  short_abstract: string;

  @Column({ type: 'text' })
  cn_abstract: string;
  @Column({ type: 'text' })
  en_abstract: string;

  @Column({ type: 'varchar', length: 100 })
  create_date: string;

  @Column({ type: 'int', unsigned: true })
  view_count: number;

  @Column()
  hero_img: string;

  @Column({ type: 'text' })
  hypertext: string;

  @Column({ type: 'json', nullable: true })
  imgs: string[];

  @CreateDateColumn({ type: 'timestamp' })
  create_date_real: string;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date: string;
}
