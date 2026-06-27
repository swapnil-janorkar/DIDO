import { pool } from "../config/db";

/**
 * Core helper — looks up an achievement by name and inserts a row into
 * user_achievements.  The UNIQUE(user_id, achievement_id) constraint plus
 * ON CONFLICT DO NOTHING means calling this multiple times is fully safe.
 */
export const unlockAchievement = async (
    userId: number,
    achievementName: string
): Promise<void> => {
    // Query 1 – resolve the achievement id from its human-readable name
    const achievementResult = await pool.query<{ id: number }>(
        `SELECT id
         FROM   achievements
         WHERE  name = $1`,
        [achievementName]
    );

    if (achievementResult.rows.length === 0) {
        // Achievement not found in the catalogue – skip silently so a typo
        // in a caller never crashes the request.
        console.warn(`[achievements] Unknown achievement: "${achievementName}"`);
        return;
    }

    const achievementId = achievementResult.rows[0].id;

    // Query 2 – insert, ignoring duplicate unlocks
    await pool.query(
        `INSERT INTO user_achievements(user_id, achievement_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, achievement_id) DO NOTHING`,
        [userId, achievementId]
    );
};

/**
 * Checks how many tasks a user has completed and unlocks the matching
 * milestone achievements.  Safe to call after every task completion.
 *
 * Milestones:
 *   ≥  1  → "First Task"
 *   ≥ 10  → "10 Tasks"
 *   ≥ 50  → "50 Tasks"
 *   ≥ 100 → "100 Tasks"
 */
export const checkTaskAchievements = async (userId: number): Promise<void> => {
    const result = await pool.query<{ completed: string }>(
        `SELECT COUNT(*) AS completed
         FROM   tasks
         WHERE  user_id  = $1
           AND  completed = true`,
        [userId]
    );

    const completed = parseInt(result.rows[0].completed, 10);

    if (completed >= 1)   await unlockAchievement(userId, "First Task");
    if (completed >= 10)  await unlockAchievement(userId, "10 Tasks");
    if (completed >= 50)  await unlockAchievement(userId, "50 Tasks");
    if (completed >= 100) await unlockAchievement(userId, "100 Tasks");
};

/**
 * Checks a user's current streak and unlocks the matching streak
 * achievements.  Safe to call after every streak update.
 *
 * Milestones:
 *   ≥  7 days → "7 Day Streak"
 *   ≥ 30 days → "30 Day Streak"
 */
export const checkStreakAchievements = async (userId: number): Promise<void> => {
    const result = await pool.query<{ current_streak: number }>(
        `SELECT current_streak
         FROM   users
         WHERE  id = $1`,
        [userId]
    );

    if (result.rows.length === 0) return;

    const currentStreak = result.rows[0].current_streak;

    if (currentStreak >= 7)  await unlockAchievement(userId, "7 Day Streak");
    if (currentStreak >= 30) await unlockAchievement(userId, "30 Day Streak");
};

/**
 * Returns all achievements a user has unlocked, ordered newest-first.
 * Joins user_achievements with achievements to return the full badge details.
 */
export const getUserAchievements = async (userId: number) => {
    const result = await pool.query(
        `SELECT
             a.name,
             a.description,
             a.badge,
             ua.unlocked_at
         FROM   user_achievements ua
         JOIN   achievements a ON ua.achievement_id = a.id
         WHERE  ua.user_id = $1
         ORDER  BY ua.unlocked_at DESC`,
        [userId]
    );

    return result.rows;
};
