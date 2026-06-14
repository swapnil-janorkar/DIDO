import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import * as analyticsService from "../services/analytics.service";

export const getProductivity = async (
    req:AuthRequest,
    res:Response
)=>{
    const data =
        await analyticsService.getProductivity(
            req.user!.id
        );

    res.json(data);
};