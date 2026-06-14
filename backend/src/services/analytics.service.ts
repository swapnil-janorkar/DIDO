import { pool } from "../config/db";

const weights: Record<string, number> = {
    CRITICAL: 5,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1
};

export const getProductivity = async (
    userId:number
) => {

    const r = await pool.query(
        `SELECT priority,completed
         FROM tasks
         WHERE user_id=$1`,
        [userId]
    );

    let total = 0;
    let completed = 0;

    for(const task of r.rows){

        const points =
            weights[task.priority] || 1;

        total += points;

        if(task.completed){
            completed += points;
        }
    }

    const score =
        total === 0
            ? 0
            : Math.round(
                (completed/total)*100
              );

    return {
        score,
        completedPoints:completed,
        totalPoints:total
    };
};