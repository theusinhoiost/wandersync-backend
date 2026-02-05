import { IsMobilePhone } from "class-validator";
import { News } from "src/news/entities/news.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    @IsMobilePhone("pt-BR")
    phone: string;

    @Column()
    password: string;

    @Column({ name: 'force_logout', default: false })
    forceLogout: boolean;

    @OneToMany(() => News, (news) => news.user)
    news: News[];

    @Column({ name: 'avatar_url', nullable: true })
    avatarUrl: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}