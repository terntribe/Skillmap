// src/models/user.model.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Roadmap } from './roadmap.model';
import { Contribution } from './contribution.model';
import { Resource } from './resource.model';
import { UserProgress } from './userProgress.model';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    @Index()
    username!: string;

    @Column({ unique: true })
    @Index()
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 'user' })
    role!: 'admin' | 'user';

    @Column({ nullable: true })
    avatarUrl?: string;

    @Column({ type: 'jsonb', nullable: true })
    socialProfiles?: {
        github?: string;
        linkedin?: string;
    };

    @OneToMany(() => Roadmap, roadmap => roadmap.author)
    roadmaps!: Roadmap[];

    @OneToMany(() => Contribution, contribution => contribution.user)
    contributions!: Contribution[];

    @OneToMany(() => Resource, resource => resource.contributor)
    resources!: Resource[];

    @OneToMany(() => UserProgress, progress => progress.user)
    progress!: UserProgress[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}