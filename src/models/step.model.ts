// src/models/step.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Roadmap } from './roadmap.model';
import { Resource } from './resource.model';
import { UserProgress } from './userProgress.model';

@Entity()
export class Step {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column('int')
    order!: number;

    @ManyToOne(() => Roadmap, roadmap => roadmap.steps)
    roadmap!: Roadmap;

    @OneToMany(() => Resource, resource => resource.step)
    resources!: Resource[];

    @OneToMany(() => UserProgress, progress => progress.step)
    completions!: UserProgress[];
}