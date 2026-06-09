import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        message: "DIDO API Running"
    });
});

export default app;