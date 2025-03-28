// src/services/user.service.ts

import { AppDataSource } from '../config/db';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

export class UserService {
    private get userRepo() {
        return AppDataSource.getRepository(User);
    }

    async createUser(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
        throw new Error("Password is required");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = this.userRepo.create({
        ...userData,
        password: hashedPassword
        } as Partial<User>); // Explicitly cast as Partial<User>

        return await this.userRepo.save(user);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepo.findOne({ 
        where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ 
        where: { email }
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepo.findOne({ 
        where: { username }
        });
    }

    async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        await this.userRepo.update(id, updateData);
        return this.findUserById(id);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
