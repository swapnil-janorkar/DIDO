import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import * as streakService from "../services/streak.service";

export const getStreak = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {

    const data =
        await streakService.getStreak(
            req.user!.id
        );

    res.json(data);
};
