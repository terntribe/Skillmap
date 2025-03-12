// src/models/tag.model.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Roadmap } from './roadmap.model';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Roadmap, roadmap => roadmap.tags)
    roadmaps!: Roadmap[];
}