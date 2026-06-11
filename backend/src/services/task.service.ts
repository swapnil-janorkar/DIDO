import { pool } from "../config/db";

export const getTasks = async () => {
    const r = await pool.query(
        "SELECT * FROM tasks ORDER BY id"
    );

    return r.rows;
};

export const createTask = async (
    title: string,
    description: string,
    priority: string
) => {
    const r = await pool.query(
        `INSERT INTO tasks
        (title,description,priority)
        VALUES($1,$2,$3)
        RETURNING *`,
        [title, description, priority]
    );

    return r.rows[0];
};