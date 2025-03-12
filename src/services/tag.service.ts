import { AppDataSource } from '../config/db';
import { Tag } from '../models/tag.model';

export class TagService {
    private tagRepo = AppDataSource.getRepository(Tag);

    async findOrCreateTag(name: string): Promise<Tag> {
        let tag = await this.tagRepo.findOneBy({ name });
        if (!tag) {
        tag = this.tagRepo.create({ name });
        await this.tagRepo.save(tag);
        }
        return tag;
    }

    async getPopularTags(limit = 10): Promise<Tag[]> {
        return this.tagRepo
        .createQueryBuilder('tag')
        .leftJoin('tag.roadmaps', 'roadmap')
        .groupBy('tag.id')
        .orderBy('COUNT(roadmap.id)', 'DESC')
        .limit(limit)
        .getMany();
    }

    async updateTag(tagId: string, updateData: Partial<Tag>): Promise<Tag> {
        await this.tagRepo.update(tagId, updateData);
        return this.tagRepo.findOneByOrFail({ id: tagId });
    }

    async deleteTag(tagId: string): Promise<void> {
        await this.tagRepo.delete(tagId);
    }
}