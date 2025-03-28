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

// Response examples should be separate from the main schema
export const ErrorExamples = {
    ValidationError: {
    value: {
        error: "Validation failed",
        details: [{ msg: "Title is required", param: "title" }]
    }
    },
    Unauthorized: {
    value: {
        error: "Authentication required"
    }
    },
    Forbidden: {
    value: {
        error: "Insufficient permissions"
    }
    },
    NotFound: {
    value: {
        error: "Roadmap not found"
    }
    },
    InternalError: {
    value: {
        error: "Internal server error"
    }
    }
};