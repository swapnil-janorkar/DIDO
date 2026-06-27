import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import * as achievementController from "../controllers/achievement.controller";

const router = Router();

router.use(authenticate);

router.get("/", achievementController.getAchievements);

export default router;
