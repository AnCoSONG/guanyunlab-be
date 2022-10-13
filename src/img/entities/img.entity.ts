import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Img {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    alt: string;

    @Column()
    url: string;

    @CreateDateColumn({ type: 'timestamp'})
    create_date: string;
}
