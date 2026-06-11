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