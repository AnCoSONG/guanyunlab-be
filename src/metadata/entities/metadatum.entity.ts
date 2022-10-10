import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadatum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true })
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
