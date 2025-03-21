import { AppDataSource } from '../config/db';
import { Step } from '../models/step.model';
import { Roadmap } from '../models/roadmap.model';

export class StepService {
    private stepRepo = AppDataSource.getRepository(Step);

    async createStep(roadmap: Roadmap, stepData: Partial<Step>): Promise<Step> {
        const lastStep = await this.stepRepo.findOne({
        where: { roadmap: { id: roadmap.id } },
        order: { order: 'DESC' }
        });

        const step = this.stepRepo.create({
        ...stepData,
        order: (lastStep?.order || 0) + 1,
        roadmap
        });

        return await this.stepRepo.save(step);
    }

    async updateStepOrder(stepId: string, newOrder: number): Promise<void> {
        await this.stepRepo.update(stepId, { order: newOrder });
    }

    async findStepsByRoadmap(roadmapId: string): Promise<Step[]> {
        return this.stepRepo.find({
        where: { roadmap: { id: roadmapId } },
        order: { order: 'ASC' }
        });
    }

    async deleteStep(stepId: string): Promise<void> {
        await this.stepRepo.delete(stepId);
    }

    async findStepById(stepId: string): Promise<Step | null> {
        return this.stepRepo.findOneBy({ id: stepId });
    }
}