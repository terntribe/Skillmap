import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user.model"; // Import entity
import { UserProgress } from "../models/userProgress.model";
import { Tag } from "../models/tag.model";
import { Step } from "../models/step.model";
import { Roadmap } from "../models/roadmap.model";
import { Resource } from "../models/resource.model";
import { Contribution } from "../models/contribution.model";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 5432,
  username: DB_USERNAME || "postgres",
  password: DB_PASSWORD || "your_password",
  database: DB_NAME || "skillmap",
  entities: [User, UserProgress, Tag, Step, Roadmap, Resource, Contribution],
  synchronize: true, // Auto-create tables (disable in production)
  logging: true, // Logs SQL queries
});