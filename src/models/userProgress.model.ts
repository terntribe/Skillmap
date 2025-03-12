// src/models/user-progress.model.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, Column } from 'typeorm';
import { User } from './user.model';
import { Step } from './step.model';

@Entity()
@Unique(['user', 'step']) // Prevent duplicate progress entries
export class UserProgress {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.progress)
    user!: User;

    @ManyToOne(() => Step, step => step.completions)
    step!: Step;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    completedAt!: Date;

    @Column({ default: false })
    isCertified!: boolean;
}