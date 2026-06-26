import { pool } from "../config/db";

export const updateStreak = async (userId: number) => {

    // ── Step 1: Read user's current streak state ─────────────────────────────
    const result = await pool.query(
        `SELECT current_streak, longest_streak, last_activity_date
         FROM users
         WHERE id = $1`,
        [userId]
    );

    if (result.rows.length === 0) return;

    const user = result.rows[0];

    // ── Step 2: Build today and yesterday as plain date strings ───────────────
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayString     = today.toISOString().split("T")[0];
    const yesterdayString = yesterday.toISOString().split("T")[0];

    const lastActivity = user.last_activity_date
        ?.toISOString()
        .split("T")[0];

    // ── Step 3: Same day? Do nothing ─────────────────────────────────────────
    if (lastActivity === todayString) return;

    // ── Step 3: Was yesterday the last active day? ────────────────────────────
    if (lastActivity === yesterdayString) {
        user.current_streak++;          // streak continues
    } else {
        user.current_streak = 1;        // streak broken — reset
    }

    // ── Step 4: Update longest streak if beaten ───────────────────────────────
    if (user.current_streak > user.longest_streak) {
        user.longest_streak = user.current_streak;
    }

    // ── Step 5: Save ──────────────────────────────────────────────────────────
    await pool.query(
        `UPDATE users
         SET current_streak     = $1,
             longest_streak     = $2,
             last_activity_date = $3
         WHERE id = $4`,
        [user.current_streak, user.longest_streak, todayString, userId]
    );
};

export const getStreak = async (userId: number) => {
    const result = await pool.query(
        `SELECT current_streak, longest_streak, last_activity_date
         FROM users
         WHERE id = $1`,
        [userId]
    );

    const user = result.rows[0];

    return {
        currentStreak:    user.current_streak,
        longestStreak:    user.longest_streak,
        lastActivityDate: user.last_activity_date
            ? new Date(user.last_activity_date).toISOString().split("T")[0]
            : null
    };
};
