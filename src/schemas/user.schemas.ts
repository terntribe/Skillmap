// src/schemas/user.schemas.ts
export const UserRegister = {
    type: 'object',
    required: ['email', 'username', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'user@skillmap.com'
        },
        username: {
            type: 'string',
            example: 'skilllearner'
        },
        password: {
            type: 'string',
            format: 'password',
            example: 'securePassword123',
            minLength: 6
        }
    }
};

export const UserLogin = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            example: 'user@skillmap.com'
        },
        password: {
            type: 'string',
            format: 'password',
            example: 'securePassword123'
        }
    }
};

export const UserResponse = {
    type: 'object',
    properties: {
    id: {
        type: 'string',
        format: 'uuid'
    },
    email: {
        type: 'string'
    },
    username: {
        type: 'string'
    },
    role: {
        type: 'string',
        enum: ['user', 'admin']
    },
    createdAt: {
        type: 'string',
        format: 'date-time'
    },
    avatarUrl: {
        type: 'string',
        nullable: true
    },
    socialProfiles: {
        type: 'object',
        nullable: true,
        properties: {
        github: { type: 'string' },
        linkedin: { type: 'string' }
        }
    }
    }
};

export const LoginResponse = {
    type: 'object',
    properties: {
    user: {
        $ref: '#/components/schemas/UserResponse'
    },
    token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
    }
};