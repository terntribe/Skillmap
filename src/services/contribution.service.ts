import { AppDataSource } from '../config/db';
import { Contribution } from '../models/contribution.model';

export class ContributionService {
    private contributionRepo = AppDataSource.getRepository(Contribution);

    async createContribution(contributionData: Partial<Contribution>): Promise<Contribution> {
        const contribution = this.contributionRepo.create(contributionData);
        return await this.contributionRepo.save(contribution);
    }

    async reviewContribution(contributionId: string, status: 'approved' | 'rejected'): Promise<Contribution> {
        await this.contributionRepo.update(contributionId, { status });
        return this.contributionRepo.findOneByOrFail({ id: contributionId });
    }

    async getPendingContributions(): Promise<Contribution[]> {
        return this.contributionRepo.find({
        where: { status: 'pending' },
        relations: ['user', 'roadmap']
        });
    }

    async deleteContribution(contributionId: string): Promise<void> {
        await this.contributionRepo.delete(contributionId);
    }
}