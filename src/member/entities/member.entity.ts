import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MemberRole {
  student = 'student',
  teacher = 'teacher',
  intern = 'intern',
}
@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  hero_avatar: string;

  @Column({ type: 'enum', enum: MemberRole, default: MemberRole.teacher })
  identity: MemberRole;

  @Column({ type: 'varchar', length: 20 })
  cn_name: string;

  @Column({ type: 'varchar', length: 50 })
  en_name: string;

  @Column({ type: 'varchar', length: 20 })
  cn_title: string;

  @Column({ type: 'varchar', length: 20 })
  en_title: string;

  @Column({ type: 'text' })
  hypertext: string;
}
