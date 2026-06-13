import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET="dido-secret";

export interface AuthRequest extends Request{
    user?:{
        id:number;
        email:string;
    };
}

export const authenticate=(
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
    const header=req.headers.authorization;

    if(!header){
        return res.status(401).json({
            message:"Token required"
        });
    }

    const token=header.split(" ")[1];

    try{
        const decoded=jwt.verify(
            token,
            SECRET
        ) as {
            id:number;
            email:string;
        };

        req.user=decoded;

        next();
    }
    catch{
        return res.status(401).json({
            message:"Invalid token"
        });
    }
};