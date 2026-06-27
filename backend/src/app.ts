import express from "express";
import cors from "cors";
import { pool } from "./config/db";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./auth/auth.routes";
import analyticsRoutes from "./routes/analytics.routes";
import streakRoutes from "./routes/streak.routes";
import achievementRoutes from "./routes/achievement.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});

app.get("/", async (_, res) => {
    const r = await pool.query(
        "SELECT NOW()"
    );

    res.json({
        message: "DIDO API Running",
        db: r.rows[0]
    });
});

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/streak", streakRoutes);
app.use("/achievements", achievementRoutes);

export default app;