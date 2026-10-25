import { Router } from "express";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    ok: true,
    data: {
      api: "healthy",
      database: "unknown",
      deriv: "not-configured",
      workers: "healthy",
      telegram: "not-configured",
    },
  });
});

router.get("/users", (_, res) => {
  res.json({
    ok: true,
    data: [
      { id: "u-1", email: "demo@money-maker.ai", role: "admin" },
      { id: "u-2", email: "trader@money-maker.ai", role: "user" },
    ],
  });
});

router.get("/audit-logs", (_, res) => {
  res.json({
    ok: true,
    data: [
      { id: "a-1", action: "login", time: new Date().toISOString() },
      { id: "a-2", action: "strategy_update", time: new Date().toISOString() },
    ],
  });
});

export { router as adminRouter };
