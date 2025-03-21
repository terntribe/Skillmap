import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { body } from 'express-validator';

const userRouter = Router();
const controller = new UserController();

userRouter.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('username').notEmpty()
], controller.register);

userRouter.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], controller.login);

userRouter.get('/me', authMiddleware, controller.getProfile);

export default userRouter;