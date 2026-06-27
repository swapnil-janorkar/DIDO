import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import * as achievementService from "../services/achievement.service";

export const getAchievements = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    const achievements = await achievementService.getUserAchievements(
        req.user!.id
    );

    res.json(achievements);
};
