import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import * as analyticsController from "../controllers/analytics.controller";

const router = Router();

router.use(authenticate);

router.get(
    "/productivity",
    analyticsController.getProductivity
);

export default router;