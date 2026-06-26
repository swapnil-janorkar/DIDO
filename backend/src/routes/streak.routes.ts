import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import * as streakController from "../controllers/streak.controller";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    streakController.getStreak
);

export default router;
