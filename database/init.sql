CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE
);

CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    due_date DATE,
    category VARCHAR(50),
    estimated_duration INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);

-- Migration guards: safely add columns if they were missing from an older DB instance.
-- These are idempotent and safe to run on every container start.
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS category VARCHAR(50);
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS estimated_duration INTEGER;

-- Streak / activity tracking columns (added in Step 1 of streaks feature).
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity_date DATE;

-- ── Achievements ────────────────────────────────────────────────────────────
-- Stores the catalogue of every possible achievement badge.
-- name is UNIQUE so ON CONFLICT (name) DO NOTHING makes reseeding safe.
CREATE TABLE IF NOT EXISTS achievements(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    badge       VARCHAR(20) NOT NULL
);

-- ── User Achievements ────────────────────────────────────────────────────────
-- Junction table that records which achievements each user has unlocked.
-- ON DELETE CASCADE keeps it tidy when a user account is removed.
-- UNIQUE(user_id, achievement_id) prevents duplicate unlocks.
CREATE TABLE IF NOT EXISTS user_achievements(
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- ── Seed Achievements ────────────────────────────────────────────────────────
-- Covers all milestone categories we'll track:
--   Tasks Completed → First Task, 10 Tasks, 50 Tasks, 100 Tasks
--   Streaks         → 7 Day Streak, 30 Day Streak
--   Analytics       → Perfect Week
INSERT INTO achievements(name, description, badge)
VALUES
    ('First Task',    'Complete your first task',              '🥇'),
    ('10 Tasks',      'Complete 10 tasks',                     '🏅'),
    ('50 Tasks',      'Complete 50 tasks',                     '🏆'),
    ('100 Tasks',     'Complete 100 tasks',                    '⭐'),
    ('7 Day Streak',  'Maintain a 7 day streak',               '🔥'),
    ('30 Day Streak', 'Maintain a 30 day streak',              '💎'),
    ('Perfect Week',  'Complete every planned task this week', '🎯')
ON CONFLICT (name) DO NOTHING;