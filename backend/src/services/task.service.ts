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
    userId: number
) => {
    const r = await pool.query(
        `INSERT INTO tasks
        (title,description,priority,user_id)
        VALUES($1,$2,$3,$4)
        RETURNING *`,
        [title, description, priority, userId]
    );

    return r.rows[0];
};
export const getTaskById = async (id:number) => {
    const r = await pool.query(
        "SELECT * FROM tasks WHERE id=$1",
        [id]
    );

    return r.rows[0];
};

export const completeTask = async (id:number) => {
    const r = await pool.query(
        `UPDATE tasks
         SET completed=true
         WHERE id=$1
         RETURNING *`,
        [id]
    );

    return r.rows[0];
};

export const deleteTask = async (id:number) => {
    await pool.query(
        "DELETE FROM tasks WHERE id=$1",
        [id]
    );
};
