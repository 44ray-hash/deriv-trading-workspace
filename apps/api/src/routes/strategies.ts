import { Router } from "express";
import { z } from "zod";

const router = Router();

const strategySchema = z.object({
  title: z.string().min(1),
  market: z.string().min(1),
  timeframe: z.string().min(1),
  mode: z.enum(["analysis", "signals", "demo", "semi", "auto"]),
  stake: z.number().positive(),
  maxDailyLoss: z.number().nonnegative(),
});

router.get("/", (_, res) => {
  res.json({
    ok: true,
    data: [
      {
        id: "strat-001",
        title: "Momentum Continuation",
        market: "R_100",
        mode: "demo",
        status: "active",
      },
      {
        id: "strat-002",
        title: "Range Breakout",
        market: "EURUSD",
        mode: "signals",
        status: "draft",
      },
    ],
  });
});

router.post("/", (req, res) => {
  const parsed = strategySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid strategy payload" });
  }

  return res.json({
    ok: true,
    message: "Strategy created. Add persistence and validation for production workflows.",
    data: { ...parsed.data, id: "strat-gen" },
  });
});

router.put("/:id", (req, res) => {
  res.json({ ok: true, message: `Strategy ${req.params.id} updated.` });
});

router.post("/:id/backtest", (req, res) => {
  res.json({
    ok: true,
    data: {
      strategyId: req.params.id,
      netProfit: 284.5,
      winRate: 66.7,
      maxDrawdown: 12.4,
      totalTrades: 42,
    },
  });
});

export { router as strategyRouter };
