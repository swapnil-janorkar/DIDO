import { Response } from "express";
import * as taskService from "../services/task.service";
import { AuthRequest } from "../auth/auth.middleware";

export const getTasks = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const tasks = await taskService.getTasks(req.user!.id);
    res.json(tasks);
};

export const createTask = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const {
        title,
        description,
        priority,
        due_date,
        category,
        estimated_duration
    } = req.body;

    const task =
        await taskService.createTask(
            title,
            description,
            priority,
            due_date,
            category,
            estimated_duration,
            req.user!.id
        );

    res.status(201).json(task);
};

export const getTaskById = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const task =
        await taskService.getTaskById(
            Number(req.params.id),
            req.user!.id
        );

    if(!task){
        res.status(404).json({
            message:"Task not found"
        });
        return;
    }

    res.json(task);
};

export const completeTask = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const task =
        await taskService.completeTask(
            Number(req.params.id),
            req.user!.id
        );

    if(!task){
        res.status(404).json({
            message:"Task not found"
        });
        return;
    }

    res.json(task);
};

export const deleteTask = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const deleted =
        await taskService.deleteTask(
            Number(req.params.id),
            req.user!.id
        );

    if(!deleted){
        res.status(404).json({
            message:"Task not found"
        });
        return;
    }

    res.json({
        message:"Task deleted"
    });
};