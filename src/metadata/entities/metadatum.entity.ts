import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadatum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true })
  about_heros: string[];

  @Column({ type: 'text' })
  contact_hypertext: string;
}
