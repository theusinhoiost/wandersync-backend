import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity('spends')
export class Spend {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    tripId: string;

    @Column('uuid')
    userId: string;

    @Column({ nullable: true })
    memberName?: string;

    @Column()
    category: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    spentAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
