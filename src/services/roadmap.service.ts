import { AppDataSource } from '../config/db';
import { Roadmap } from '../models/roadmap.model';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';
import { TagService } from './tag.service';

export class RoadmapService {
    private tagService = new TagService();
    private roadmapRepo = AppDataSource.getRepository(Roadmap);

    async createRoadmap(user: User, roadmapData: Partial<Roadmap>, tagNames: string[]): Promise<Roadmap> {
        const tags: Tag[] = [];

        for (const name of tagNames) {
        let tag = await this.tagService.findOrCreateTag(name);

        tags.push(tag);
        }

        const roadmap = this.roadmapRepo.create({
        ...roadmapData,
        author: user,
        tags
        } as Partial<Roadmap>); // Explicitly cast to avoid TypeScript errors

        return await this.roadmapRepo.save(roadmap);
    }

    async findRoadmapById(id: string): Promise<Roadmap | null> {
        return this.roadmapRepo.findOne({
        where: { id },
        relations: ['author', 'steps', 'tags']
        });
    }

    async findRoadmapsByStatus(status: 'draft' | 'published'): Promise<Roadmap[]> {
        return this.roadmapRepo.find({
        where: { status },
        relations: ['author', 'tags']
        }) as Promise<Roadmap[]>; // Ensures all required properties are properly fetched
    }

    async updateRoadmap(id: string, updateData: Partial<Roadmap>): Promise<Roadmap | null> {
        await this.roadmapRepo.update(id, updateData);
        return this.findRoadmapById(id);
    }

    async deleteRoadmap(id: string): Promise<void> {
        await this.roadmapRepo.delete(id);
    }
}
