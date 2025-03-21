import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { JWT_SECRET } from '../config/env';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    try {
      const { email, username, password } = req.body as { email: string; password: string; username: string };
  
      // Check if the email or username is already in use
      const existingUserByEmail = await this.userService.findByEmail(email);
      if (existingUserByEmail) {
        res.status(400).json({ error: 'Email is already in use' });
        return;
      }
  
      const existingUserByUsername = await this.userService.findByUsername(username);
      if (existingUserByUsername) {
        res.status(400).json({ error: 'Username is already in use' });
        return;
      }
  
      // Create the user if no conflicts
      const user = await this.userService.createUser({ email, username, password });
      const token = jwt.sign({ id: user.id }, JWT_SECRET!, { expiresIn: '7d' });
      res.status(201).json({ user: this.sanitizeUser(user), token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user || !(await user.comparePassword(password))) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      
      const token = jwt.sign({ id: user!.id }, JWT_SECRET!, { expiresIn: '7d' });
      res.json({ user: this.sanitizeUser(user!), token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.findUserById(req.body.user.id);
      res.json(this.sanitizeUser(user!));
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  };

  private sanitizeUser(user: User) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}