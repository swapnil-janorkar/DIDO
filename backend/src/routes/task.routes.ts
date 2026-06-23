import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", taskController.getTasks);

router.post("/", taskController.createTask);

router.get(
    "/:id",
    taskController.getTaskById
);

router.patch(
    "/:id/complete",
    taskController.completeTask
);

router.patch(
    "/:id",
    taskController.updateTask
);

router.delete(
    "/:id",
    taskController.deleteTask
);

export default router;