import dotenv from "dotenv";
import { AutomationRunner } from "./AutomationRunner.js";
import { RiskManager } from "./risk/RiskManager.js";
import { TrendBreakoutStrategy } from "./strategies/TrendBreakout.js";

dotenv.config();

const chart = [101.2, 101.8, 102.5, 103.1, 103.8, 104.7, 105.3, 106.0, 106.5, 107.6];
const strategy = new TrendBreakoutStrategy();
const riskManager = new RiskManager({
  maxDailyLoss: 200,
  maxExposure: 0.2,
  balance: 1000,
});
const runner = new AutomationRunner(strategy, riskManager);

const result = runner.runCycle("R_100", chart);
console.log("Worker result:", result);
