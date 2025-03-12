import { AppDataSource } from '../config/db';
import { UserProgress } from '../models/userProgress.model';

export class UserProgressService {
    private progressRepo = AppDataSource.getRepository(UserProgress);

    async trackProgress(progressData: Partial<UserProgress>): Promise<UserProgress> {
        const progress = this.progressRepo.create(progressData);
        return await this.progressRepo.save(progress);
    }

    async certifyProgress(progressId: string): Promise<UserProgress> {
        await this.progressRepo.update(progressId, { isCertified: true });
        return this.progressRepo.findOneByOrFail({ id: progressId });
    }

    async getUserProgress(userId: string): Promise<UserProgress[]> {
        return this.progressRepo.find({
        where: { user: { id: userId } },
        relations: ['step']
        });
    }

    async resetProgress(progressId: string): Promise<void> {
        await this.progressRepo.delete(progressId);
    }
}