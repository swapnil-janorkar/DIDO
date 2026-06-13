import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../auth/auth.middleware";

export const getTasks = async (
    req: AuthRequest,
    res: Response
) => {
    const tasks = await taskService.getTasks(req.user!.id);
    res.json(tasks);
};

export const createTask = async (
    req: AuthRequest,
    res: Response
) => {
    const { title, description, priority } = req.body;

    const task =
        await taskService.createTask(
            title,
            description,
            priority,
            req.user!.id
        );

    res.status(201).json(task);
};
export const getTaskById = async (
    req: AuthRequest,
    res: Response
) => {
    const task =
        await taskService.getTaskById(
            Number(req.params.id),
            req.user!.id
        );

    res.json(task);
};

export const completeTask = async (
    req: AuthRequest,
    res: Response
) => {
    const task =
        await taskService.completeTask(
            Number(req.params.id),
            req.user!.id
        );

    res.json(task);
};

export const deleteTask = async (
    req: AuthRequest,
    res: Response
) => {
    await taskService.deleteTask(
        Number(req.params.id),
        req.user!.id
    );

    res.json({
        message:"Task deleted"
    });
};