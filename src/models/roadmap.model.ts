// src/models/roadmap.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.model';
import { Step } from './step.model';
import { Tag } from './tag.model';
import { Contribution } from './contribution.model';

@Entity()
export class Roadmap {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @Column({ type: 'enum', enum: ['beginner', 'intermediate', 'advanced'] })
    difficulty!: string;

    @Column({ default: 'draft' })
    status!: 'draft' | 'published';

    @ManyToOne(() => User, user => user.roadmaps)
    author!: User;

    @OneToMany(() => Step, step => step.roadmap, { cascade: true })
    steps!: Step[];

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags!: Tag[];

    @OneToMany(() => Contribution, contribution => contribution.roadmap)
    contributions!: Contribution[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    publishedAt?: Date;
}