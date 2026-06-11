import { Request, Response } from "express";
import * as taskService from "../services/task.service";

export const getTasks = async (
    _: Request,
    res: Response
) => {
    const tasks = await taskService.getTasks();
    res.json(tasks);
};

export const createTask = async (
    req: Request,
    res: Response
) => {
    const { title, description, priority } = req.body;

    const task =
        await taskService.createTask(
            title,
            description,
            priority
        );

    res.status(201).json(task);
};
export const getTaskById = async (
    req: Request,
    res: Response
) => {
    const task =
        await taskService.getTaskById(
            Number(req.params.id)
        );

    res.json(task);
};

export const completeTask = async (
    req: Request,
    res: Response
) => {
    const task =
        await taskService.completeTask(
            Number(req.params.id)
        );

    res.json(task);
};

export const deleteTask = async (
    req: Request,
    res: Response
) => {
    await taskService.deleteTask(
        Number(req.params.id)
    );

    res.json({
        message:"Task deleted"
    });
};