import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Metadatum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  about_hero: string[];

  @Column({ type: 'text' })
  recruit_hypertext: string;

  @Column({ type: 'text' })
  collaboration_sponsor_hypertext: string;

  @Column({ type: 'text' })
  lab_office_hypertext: string;

  @Column({ type: 'text' })
  info_hypertext: string;
}
