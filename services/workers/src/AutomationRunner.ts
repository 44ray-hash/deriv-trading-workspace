import type { TradingSignal } from "@money-maker/shared";
import { RiskManager } from "./risk/RiskManager.js";
import { TrendBreakoutStrategy } from "./strategies/TrendBreakout.js";

export class AutomationRunner {
  constructor(
    private readonly strategy: TrendBreakoutStrategy,
    private readonly riskManager: RiskManager,
  ) {}

  runCycle(symbol: string, priceHistory: number[]) {
    const signal = this.strategy.evaluate(priceHistory, symbol);
    const riskAllowed = this.riskManager.canTrade(1000, 150);

    if (!riskAllowed) {
      return {
        ...signal,
        direction: "WAIT" as const,
        explanation: "Risk policy prevented execution. Only analysis mode remains enabled.",
      };
    }

    return signal;
  }
}
