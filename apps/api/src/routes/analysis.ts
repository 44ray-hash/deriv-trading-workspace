import { Router } from "express";

const router = Router();

router.get("/market/:symbol", (req, res) => {
  const { symbol } = req.params;
  res.json({
    ok: true,
    data: {
      symbol,
      timeframe: "1H",
      trend: "Bullish",
      lastPrice: 102.75,
      indicators: {
        ema9: 101.8,
        ema21: 100.6,
        ema50: 99.2,
        rsi14: 61.8,
      },
    },
  });
});

router.get("/signals", (_, res) => {
  res.json({
    ok: true,
    data: [
      {
        symbol: "R_100",
        marketName: "Volatility 100 Index",
        timeframe: "5m",
        direction: "BUY",
        confidence: 0.78,
        price: 109.2,
        stopLoss: 108.4,
        takeProfit: 111.1,
        riskLevel: "MEDIUM",
        explanation: "EMA alignment and rising momentum support continuation above support.",
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
      },
      {
        symbol: "EURUSD",
        marketName: "Euro / US Dollar",
        timeframe: "15m",
        direction: "WAIT",
        confidence: 0.42,
        price: 1.0784,
        riskLevel: "LOW",
        explanation: "Conflicting structure with weak breakout confirmation.",
        expiresAt: new Date(Date.now() + 120 * 1000).toISOString(),
      },
    ],
  });
});

router.get("/scanner", (_, res) => {
  res.json({
    ok: true,
    data: [
      {
        symbol: "R_100",
        trend: "Bullish",
        signal: "BUY",
        score: 88,
        risk: "MEDIUM",
        lastUpdated: new Date().toISOString(),
      },
      {
        symbol: "EURUSD",
        trend: "Neutral",
        signal: "WAIT",
        score: 52,
        risk: "LOW",
        lastUpdated: new Date().toISOString(),
      },
    ],
  });
});

export { router as analysisRouter };
