// src/models/resource.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Step } from './step.model';

@Entity()
export class Resource {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    url!: string;

    @Column()
    type!: 'video' | 'article' | 'course' | 'documentation';

    @Column({ default: 0 })
    upvotes!: number;

    @Column({ default: 0 })
    downvotes!: number;

    @ManyToOne(() => Step, step => step.resources)
    step!: Step;

    @ManyToOne(() => User, user => user.resources)
    contributor!: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}