import { pool } from "../config/db";

export const getTasks = async (userId: number) => {
    const r = await pool.query(
        "SELECT * FROM tasks WHERE user_id=$1 ORDER BY id",
        [userId]
    );

    return r.rows;
};

export const createTask = async (
    title: string,
    description: string,
    priority: string,
    dueDate: string,
    category: string,
    estimatedDuration: number,
    userId: number
) => {
    const r = await pool.query(
        `INSERT INTO tasks
        (
            title,
            description,
            priority,
            due_date,
            category,
            estimated_duration,
            user_id
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
        [
            title,
            description,
            priority,
            dueDate,
            category,
            estimatedDuration,
            userId
        ]
    );

    return r.rows[0];
};
export const getTaskById = async (id: number, userId: number) => {
    const r = await pool.query(
        "SELECT * FROM tasks WHERE id=$1 AND user_id=$2",
        [id, userId]
    );

    if(r.rowCount === 0) return null;

    return r.rows[0];
};

export const completeTask = async (id: number, userId: number) => {
    const r = await pool.query(
        `UPDATE tasks
         SET completed=true
         WHERE id=$1
         AND user_id=$2
         RETURNING *`,
        [id, userId]
    );

    if(r.rowCount === 0) return null;

    return r.rows[0];
};

export const deleteTask = async (id: number, userId: number) => {
    const r = await pool.query(
        "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
        [id, userId]
    );

    if(r.rowCount === 0) return null;

    return true;
};
