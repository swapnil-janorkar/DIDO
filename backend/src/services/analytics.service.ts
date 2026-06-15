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

    const result = await pool.query(
        `
        SELECT *
        FROM tasks
        WHERE user_id=$1
        `,
        [userId]
    );

    const tasks = result.rows;

    let totalPoints = 0;
    let completedPoints = 0;
    let completedTasks = 0;

    for(const task of tasks){

        const points =
            weights[task.priority] || 1;

        totalPoints += points;

        if(task.completed){

            completedTasks++;

            completedPoints += points;
        }
    }

    const pendingTasks =
        tasks.length - completedTasks;

    const score =
        totalPoints === 0
            ? 0
            : Math.round(
                (completedPoints/totalPoints)*100
            );

    return {
        score,
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
        completedPoints,
        totalPoints
    };
};