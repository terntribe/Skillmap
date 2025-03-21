// src/routes/roadmap.route.ts
import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';
import { roadmapValidator } from '../utils/validator';

const roadmapRouter = Router();
const controller = new RoadmapController();

// Public routes
roadmapRouter.get('/', controller.listRoadmaps);
roadmapRouter.get('/:id', controller.getRoadmap);
roadmapRouter.get('/tags/popular', controller.getPopularTags);

// Authenticated routes
roadmapRouter.use(authMiddleware);

roadmapRouter.post('/', roadmapValidator, controller.createRoadmap);
roadmapRouter.put('/:id', roadmapValidator, controller.updateRoadmap);
roadmapRouter.delete('/:id', controller.deleteRoadmap);
roadmapRouter.patch('/:id/publish', controller.publishRoadmap);

// Steps
roadmapRouter.post('/:id/steps', controller.createStep);
roadmapRouter.get('/:id/steps', controller.getSteps);

// Progress tracking
roadmapRouter.post('/:id/progress/:stepId', controller.trackProgress);

// Contributions
roadmapRouter.post('/:id/contributions', controller.submitContribution);

// Admin routes
roadmapRouter.use(adminMiddleware);
roadmapRouter.get('/contributions/pending', controller.getPendingContributions);
roadmapRouter.patch('/contributions/:id/review', controller.reviewContribution);

export default roadmapRouter;