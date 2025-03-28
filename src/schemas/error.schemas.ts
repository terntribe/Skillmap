// src/schemas/error.schemas.ts
export const ErrorResponse = {
    type: 'object',
    properties: {
    error: {
        type: 'string',
        example: 'Error message description'
    },
    details: {
        type: 'array',
        items: {
        type: 'object',
        properties: {
            msg: { type: 'string' },
            param: { type: 'string' },
            location: { type: 'string' }
        }
        }
    }
    }
};