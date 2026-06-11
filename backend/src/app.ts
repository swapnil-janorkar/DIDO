import express from "express";
import { pool } from "./config/db";

const app = express();

app.use(express.json());

app.get("/", async (_, res) => {
    const r = await pool.query("SELECT NOW()");

    res.json({
        message: "DIDO API Running",
        dbTime: r.rows[0]
    });
});

export default app;