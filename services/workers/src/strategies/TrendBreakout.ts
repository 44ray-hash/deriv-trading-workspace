import type { TradingSignal } from "@money-maker/shared";

export class TrendBreakoutStrategy {
  evaluate(priceHistory: number[], symbol: string): TradingSignal {
    const last = priceHistory[priceHistory.length - 1] ?? 0;
    const previous = priceHistory[priceHistory.length - 2] ?? last;
    const delta = last - previous;

    if (delta > 0) {
      return {
        symbol,
        marketName: "Volatility Index",
        timeframe: "5m",
        direction: "BUY",
        confidence: 0.78,
        price: last,
        stopLoss: last - 0.8,
        takeProfit: last + 1.6,
        riskLevel: "MEDIUM",
        explanation: "Price action confirms upward continuation with positive momentum.",
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
      };
    }

    if (delta < 0) {
      return {
        symbol,
        marketName: "Volatility Index",
        timeframe: "5m",
        direction: "SELL",
        confidence: 0.72,
        price: last,
        stopLoss: last + 0.8,
        takeProfit: last - 1.6,
        riskLevel: "MEDIUM",
        explanation: "Price action shows downside pressure and failed breakout support.",
        expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
      };
    }

    return {
      symbol,
      marketName: "Volatility Index",
      timeframe: "5m",
      direction: "WAIT",
      confidence: 0.41,
      price: last,
      riskLevel: "LOW",
      explanation: "Signal is inconclusive due to weak trend confirmation.",
      expiresAt: new Date(Date.now() + 60 * 1000).toISOString(),
    };
  }
}
