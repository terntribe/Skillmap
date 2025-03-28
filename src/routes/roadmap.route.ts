// src/routes/roadmap.route.ts
import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';
import { roadmapValidator } from '../utils/validator';

const roadmapRouter = Router();
const controller = new RoadmapController();

/**
 * @swagger
 * tags:
 *   - name: Roadmaps
 *     description: Learning roadmap management
 *   - name: Contributions
 *     description: Community contribution management
 *   - name: Tags
 *     description: Roadmap categorization tags
 */

// Public routes

/**
 * @swagger
 * /roadmaps:
 *   get:
 *     summary: Get all published roadmaps
 *     tags: [Roadmaps]
 *     responses:
 *       200:
 *         description: List of published roadmaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoadmapResponse'
 *       500:
 *         $ref: '#/components/examples/InternalError'
 */
roadmapRouter.get('/', controller.listRoadmaps);

/**
 * @swagger
 * /roadmaps/{id}:
 *   get:
 *     summary: Get roadmap by ID
 *     tags: [Roadmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Roadmap details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoadmapResponse'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 *       500:
 *         $ref: '#/components/examples/InternalError'
 */
roadmapRouter.get('/:id', controller.getRoadmap);

/**
 * @swagger
 * /roadmaps/tags/popular:
 *   get:
 *     summary: Get popular tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of popular tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TagResponse'
 *       500:
 *         $ref: '#/components/examples/InternalError'
 */
roadmapRouter.get('/tags/popular', controller.getPopularTags);

// Authenticated routes
roadmapRouter.use(authMiddleware);

/**
 * @swagger
 * /roadmaps:
 *   post:
 *     summary: Create a new roadmap
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoadmapCreate'
 *     responses:
 *       201:
 *         description: Roadmap created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoadmapResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 */
roadmapRouter.post('/', roadmapValidator, controller.createRoadmap);

/**
 * @swagger
 * /roadmaps/{id}:
 *   put:
 *     summary: Update a roadmap
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoadmapCreate'
 *     responses:
 *       200:
 *         description: Roadmap updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoadmapResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 */
roadmapRouter.put('/:id', roadmapValidator, controller.updateRoadmap);

/**
 * @swagger
 * /roadmaps/{id}:
 *   delete:
 *     summary: Delete a roadmap
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Roadmap deleted successfully
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 *       500:
 *         $ref: '#/components/examples/InternalError'
 */
roadmapRouter.delete('/:id', controller.deleteRoadmap);

/**
 * @swagger
 * /roadmaps/{id}/publish:
 *   patch:
 *     summary: Publish a draft roadmap
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Roadmap published
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoadmapResponse'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       403:
 *         $ref: '#/components/examples/Forbidden'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 */
roadmapRouter.patch('/:id/publish', controller.publishRoadmap);

// Steps

/**
 * @swagger
 * /roadmaps/{id}/steps:
 *   post:
 *     summary: Add step to roadmap
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StepCreate'
 *     responses:
 *       201:
 *         description: Step created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StepResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 */
roadmapRouter.post('/:id/steps', controller.createStep);

/**
 * @swagger
 * /roadmaps/{id}/steps:
 *   get:
 *     summary: Get all steps for a roadmap
 *     tags: [Roadmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of steps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StepResponse'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 */
roadmapRouter.get('/:id/steps', controller.getSteps);

// Progress tracking

/**
 * @swagger
 * /roadmaps/{id}/progress/{stepId}:
 *   post:
 *     summary: Track progress on a roadmap step
 *     tags: [Roadmaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Progress tracked
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProgressResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 */
roadmapRouter.post('/:id/progress/:stepId', controller.trackProgress);

// Contributions

/**
 * @swagger
 * /roadmaps/{id}/contributions:
 *   post:
 *     summary: Submit a contribution for a roadmap
 *     tags: [Contributions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - type
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Add new resources section"
 *               type:
 *                 type: string
 *                 enum: [roadmap-creation, roadmap-edit, resource-submission]
 *     responses:
 *       201:
 *         description: Contribution submitted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContributionResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 */
roadmapRouter.post('/:id/contributions', controller.submitContribution);

// Admin routes
roadmapRouter.use(adminMiddleware);

/**
 * @swagger
 * /roadmaps/contributions/pending:
 *   get:
 *     summary: Get pending contributions (Admin only)
 *     tags: [Contributions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending contributions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContributionResponse'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       403:
 *         $ref: '#/components/examples/Forbidden'
 */
roadmapRouter.get('/contributions/pending', controller.getPendingContributions);

/**
 * @swagger
 * /roadmaps/contributions/{id}/review:
 *   patch:
 *     summary: Review a contribution (Admin only)
 *     tags: [Contributions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Contribution reviewed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContributionResponse'
 *       400:
 *         $ref: '#/components/examples/ValidationError'
 *       401:
 *         $ref: '#/components/examples/Unauthorized'
 *       403:
 *         $ref: '#/components/examples/Forbidden'
 *       404:
 *         $ref: '#/components/examples/NotFound'
 */
roadmapRouter.patch('/contributions/:id/review', controller.reviewContribution);

export default roadmapRouter;