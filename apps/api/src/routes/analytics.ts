import { Router } from "express";

const router = Router();

router.get("/performance", (_, res) => {
  res.json({
    ok: true,
    data: {
      totalTrades: 124,
      winRate: 68.4,
      netProfit: 1423.2,
      drawdown: 12.8,
      averageTrade: 11.5,
    },
  });
});

export { router as analyticsRouter };
