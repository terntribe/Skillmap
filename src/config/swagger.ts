// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import { PORT } from './env';
import { 
    UserRegister, 
    UserLogin, 
    UserResponse, 
    LoginResponse 
} from '../schemas/user.schemas';
import {
    RoadmapCreate,
    RoadmapResponse,
    StepCreate,
    StepResponse,
    TagResponse,
    ContributionResponse
} from '../schemas/roadmap.schemas';
import { 
    ErrorResponse,
    ErrorExamples
 } from '../schemas/error.schemas';


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Skillmap API Documentation',
            version: '1.0.0',
            description: 'Interactive learning roadmap platform API documentation',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                },
            },
            schemas: {
                UserRegister,
                UserLogin,
                UserResponse,
                LoginResponse,
                ErrorResponse,
                RoadmapCreate,
                RoadmapResponse,
                StepCreate,
                StepResponse,
                TagResponse,
                ContributionResponse
            },
            examples: ErrorExamples,
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts', './src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerSetup = (app: Application) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};