// src/controllers/roadmap.controller.ts
import { Request, Response } from 'express';
import { RoadmapService } from '../services/roadmap.service';
import { ContributionService } from '../services/contribution.service';
import { StepService } from '../services/step.service';
import { ResourceService } from '../services/resource.service';
import { UserProgressService } from '../services/userProgress.service';
import { TagService } from '../services/tag.service';
import { validationResult } from 'express-validator';

export class RoadmapController {
  private roadmapService = new RoadmapService();
  private contributionService = new ContributionService();
  private stepService = new StepService();
  private resourceService = new ResourceService();
  private progressService = new UserProgressService();
  private tagService = new TagService();

  // Roadmap CRUD Operations
  createRoadmap = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() }); 
      return;
    }

    try {
      const roadmap = await this.roadmapService.createRoadmap(
        req.body.user,
        req.body,
        req.body.tags || []
      );
      res.status(201).json(roadmap);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  getRoadmap = async (req: Request, res: Response)  => {
    try {
      const roadmap = await this.roadmapService.findRoadmapById(req.params.id);
      roadmap ? res.json(roadmap) : res.status(404).json({ error: 'Roadmap not found' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  listRoadmaps = async (req: Request, res: Response) => {
    try {
      const roadmaps = await this.roadmapService.findRoadmapsByStatus('published');
      res.json(roadmaps);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  updateRoadmap = async (req: Request, res: Response) => {
    try {
      const updated = await this.roadmapService.updateRoadmap(req.params.id, req.body);
      updated ? res.json(updated) : res.status(404).json({ error: 'Roadmap not found' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteRoadmap = async (req: Request, res: Response)  => {
    try {
      await this.roadmapService.deleteRoadmap(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Roadmap Publishing
  publishRoadmap = async (req: Request, res: Response)  => {
    try {
      const roadmap = await this.roadmapService.updateRoadmap(req.params.id, {
        status: 'published',
        publishedAt: new Date()
      });
      res.json(roadmap);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Step Management
  createStep = async (req: Request, res: Response) => {
    try {
      const roadmap = await this.roadmapService.findRoadmapById(req.params.id);
      if (!roadmap){
        res.status(404).json({ error: 'Roadmap not found' });
        return;
      }

      const step = await this.stepService.createStep(roadmap, req.body);
      res.status(201).json(step);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  getSteps = async (req: Request, res: Response) => {
    try {
      const steps = await this.stepService.findStepsByRoadmap(req.params.id);
      res.json(steps);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Resource Management
  addResource = async (req: Request, res: Response) => {
    try {
      const resource = await this.resourceService.createResource({
        ...req.body,
        step: { id: req.params.stepId },
        contributor: req.body.user
      });
      res.status(201).json(resource);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Progress Tracking
  trackProgress = async (req: Request, res: Response) => {
    try {
      const progress = await this.progressService.trackProgress({
        user: req.body.user,
        step: (await this.stepService.findStepById(req.params.stepId)) || undefined
      });
      res.status(201).json(progress);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Contributions
  submitContribution = async (req: Request, res: Response) => {
    try {
      const contribution = await this.contributionService.createContribution({
        ...req.body,
        user: req.body.user,
        roadmap: { id: req.params.id }
      });
      res.status(201).json(contribution);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Admin Endpoints
  reviewContribution = async (req: Request, res: Response) => {
    try {
      const contribution = await this.contributionService.reviewContribution(
        req.params.id,
        req.body.status
      );
      res.json(contribution);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  getPendingContributions  = async (req: Request, res: Response) => {
    try {
      const contributions = await this.contributionService.getPendingContributions();
      res.json(contributions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Tag Management
  getPopularTags = async (req: Request, res: Response) => {
    try {
      const tags = await this.tagService.getPopularTags();
      res.json(tags);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}