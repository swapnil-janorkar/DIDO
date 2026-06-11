import express from "express";
import { pool } from "./config/db";
import taskRoutes from "./routes/task.routes";

const app = express();

app.use(express.json());

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

export default app;