// src/schemas/roadmap.schemas.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProgressResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         completedAt:
 *           type: string
 *           format: date-time
 *         isCertified:
 *           type: boolean
 *         step:
 *           $ref: '#/components/schemas/StepResponse'
 * 
 *     ResourceResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         url:
 *           type: string
 *         type:
 *           type: string
 *           enum: [video, article, course, documentation]
 *         upvotes:
 *           type: integer
 *         downvotes:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 */

export const RoadmapCreate = {
    type: 'object',
    required: ['title', 'description', 'difficulty'],
    properties: {
    title: {
        type: 'string',
        example: 'Learn Node.js'
    },
    description: {
        type: 'string',
        example: 'Complete guide to mastering Node.js'
    },
    difficulty: {
        type: 'string',
        enum: ['beginner', 'intermediate', 'advanced']
    },
    tags: {
        type: 'array',
        items: {
        type: 'string',
        example: 'backend'
        }
    }
    }
};

export const RoadmapResponse = {
    type: 'object',
    properties: {
    id: {
        type: 'string',
        format: 'uuid'
    },
    title: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    difficulty: {
        type: 'string'
    },
    status: {
        type: 'string',
        enum: ['draft', 'published']
    },
    author: {
        $ref: '#/components/schemas/UserResponse'
    },
    steps: {
        type: 'array',
        items: {
        $ref: '#/components/schemas/StepResponse'
        }
    },
    tags: {
        type: 'array',
        items: {
        $ref: '#/components/schemas/TagResponse'
        }
    },
    createdAt: {
        type: 'string',
        format: 'date-time'
    },
    publishedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true
    }
    }
};

export const StepCreate = {
    type: 'object',
    required: ['title'],
    properties: {
    title: {
        type: 'string',
        example: 'Learn Express.js'
    },
    description: {
        type: 'string',
        example: 'Understanding middleware and routing'
    }
    }
};

export const StepResponse = {
    type: 'object',
    properties: {
    id: {
        type: 'string',
        format: 'uuid'
    },
    title: {
        type: 'string'
    },
    description: {
        type: 'string',
        nullable: true
    },
    order: {
        type: 'integer'
    },
    resources: {
        type: 'array',
        items: {
        $ref: '#/components/schemas/ResourceResponse'
        }
    }
    }
};

export const TagResponse = {
    type: 'object',
    properties: {
    id: {
        type: 'string',
        format: 'uuid'
    },
    name: {
        type: 'string'
    },
    description: {
        type: 'string',
        nullable: true
    }
    }
};

export const ContributionResponse = {
    type: 'object',
    properties: {
    id: {
        type: 'string',
        format: 'uuid'
    },
    content: {
        type: 'string'
    },
    status: {
        type: 'string',
        enum: ['pending', 'approved', 'rejected']
    },
    type: {
        type: 'string',
        enum: ['roadmap-creation', 'roadmap-edit', 'resource-submission']
    },
    user: {
        $ref: '#/components/schemas/UserResponse'
    },
    createdAt: {
        type: 'string',
        format: 'date-time'
    }
    }
};

export const UserProgressResponse = {
    type: 'object',
    properties: {
    id: { type: 'string', format: 'uuid' },
    completedAt: { type: 'string', format: 'date-time' },
    isCertified: { type: 'boolean' },
    step: { $ref: '#/components/schemas/StepResponse' }
    }
};

export const ResourceResponse = {
    type: 'object',
    properties: {
    id: { type: 'string', format: 'uuid' },
    url: { type: 'string' },
    type: { 
        type: 'string',
        enum: ['video', 'article', 'course', 'documentation']
    },
    upvotes: { type: 'integer' },
    downvotes: { type: 'integer' },
    createdAt: { type: 'string', format: 'date-time' }
    }
};