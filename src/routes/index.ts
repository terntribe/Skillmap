// src/routes/index.ts

import { Router } from "express";
import userRoutes from "./user.route";
import roadmapRoutes from "./roadmap.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/roadmaps", roadmapRoutes);

export default router;