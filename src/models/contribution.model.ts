// src/models/contribution.model.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.model';
import { Roadmap } from './roadmap.model';

@Entity()
export class Contribution {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ 
        type: 'enum', 
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    })
    status!: string;

    @Column({ 
        type: 'enum',
        enum: ['roadmap-creation', 'roadmap-edit', 'resource-submission']
    })
    type!: string;

    @ManyToOne(() => User, user => user.contributions)
    user!: User;

    @ManyToOne(() => Roadmap, { nullable: true })
    roadmap?: Roadmap;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}