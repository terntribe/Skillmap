import { checkSchema } from 'express-validator';

export const roadmapValidator = checkSchema({
  title: {
    notEmpty: true,
    errorMessage: 'Title is required'
  },
  difficulty: {
    isIn: {
      options: [['beginner', 'intermediate', 'advanced']],
      errorMessage: 'Invalid difficulty level'
    }
  }
});