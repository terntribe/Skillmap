import { AppDataSource } from '../config/db';
import { Resource } from '../models/resource.model';

export class ResourceService {
    private resourceRepo = AppDataSource.getRepository(Resource);

    async createResource(resourceData: Partial<Resource>): Promise<Resource> {
        const resource = this.resourceRepo.create(resourceData);
        return await this.resourceRepo.save(resource);
    }

    async upvoteResource(resourceId: string): Promise<void> {
        await this.resourceRepo.increment({ id: resourceId }, 'upvotes', 1);
    }

    async downvoteResource(resourceId: string): Promise<void> {
        await this.resourceRepo.decrement({ id: resourceId }, 'downvotes', 1);
    }

    async findResourcesByStep(stepId: string): Promise<Resource[]> {
        return this.resourceRepo.find({
        where: { step: { id: stepId } },
        order: { upvotes: 'DESC' }
        });
    }

    async deleteResource(resourceId: string): Promise<void> {
        await this.resourceRepo.delete(resourceId);
    }
}