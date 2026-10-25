import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.js";
import { analysisRouter } from "./routes/analysis.js";
import { strategyRouter } from "./routes/strategies.js";
import { tradingRouter } from "./routes/trading.js";
import { notificationRouter } from "./routes/notifications.js";
import { analyticsRouter } from "./routes/analytics.js";
import { adminRouter } from "./routes/admin.js";
import { derivRouter } from "./routes/deriv.js";
import { env } from "./config/env.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ ok: true, service: "money-maker-api", status: "running" });
});

app.use("/api/auth", authRouter);
app.use("/api/analysis", analysisRouter);
app.use("/api/strategies", strategyRouter);
app.use("/api/trading", tradingRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/deriv", derivRouter);

app.listen(env.port, () => {
  console.log(`Money Maker API listening on http://localhost:${env.port}`);
});
