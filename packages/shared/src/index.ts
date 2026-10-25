export type SignalDirection = "BUY" | "SELL" | "WAIT";
export type StrategyMode = "analysis" | "signals" | "demo" | "semi" | "auto";

export interface MarketDataPoint {
  symbol: string;
  timestamp: number;
  price: number;
  volume?: number;
}

export interface TradingSignal {
  symbol: string;
  marketName: string;
  timeframe: string;
  direction: SignalDirection;
  confidence: number;
  price: number;
  stopLoss?: number;
  takeProfit?: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
  expiresAt: string;
}

export interface StrategyConfig {
  market: string;
  timeframe: string;
  mode: StrategyMode;
  maxDailyLoss: number;
  maxConcurrentPositions: number;
  stake: number;
}
