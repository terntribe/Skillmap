import { JWT_SECRET } from '../config/env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token!, JWT_SECRET!);
    if (typeof decoded === 'object' && 'id' in decoded) {
      req.body.user = { id: (decoded as jwt.JwtPayload).id };
    } else {
      throw new Error('Invalid token payload');
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Implement admin check logic
  next();
};