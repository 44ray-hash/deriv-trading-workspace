import { Router } from "express";
import { z } from "zod";

const router = Router();

const orderSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["BUY", "SELL"]),
  stake: z.number().positive(),
  duration: z.number().positive().optional(),
  strategy: z.string().optional(),
});

router.post("/preview", (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid preview payload" });
  }

  res.json({
    ok: true,
    data: {
      ...parsed.data,
      status: "approved-preview",
      estimatedCost: parsed.data.stake,
      risk: "MEDIUM",
    },
  });
});

router.post("/execute", (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid execution payload" });
  }

  res.json({
    ok: true,
    message: "Execution request created. Final confirmation must come from Deriv and the user authorization workflow.",
    data: {
      id: "trade-123",
      symbol: parsed.data.symbol,
      side: parsed.data.side,
      status: "pending-confirmation",
    },
  });
});

router.post("/stop", (_, res) => {
  res.json({ ok: true, message: "All trading stopped for the active session." });
});

router.get("/history", (_, res) => {
  res.json({
    ok: true,
    data: [
      { id: "111", symbol: "R_100", side: "BUY", outcome: "Open", pnl: 0 },
      { id: "112", symbol: "EURUSD", side: "SELL", outcome: "Closed", pnl: 26.5 },
    ],
  });
});

export { router as tradingRouter };
