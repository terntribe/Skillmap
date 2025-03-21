import { Request, Response } from 'express';
import { RoadmapService } from '../services/roadmap.service';

export class RoadmapController {
  private roadmapService = new RoadmapService();

  createRoadmap = async (req: Request, res: Response) => {
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

  getRoadmap = async (req: Request, res: Response) => {
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
}