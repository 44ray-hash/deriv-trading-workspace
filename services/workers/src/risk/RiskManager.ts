export class RiskManager {
  constructor(
    private readonly config: {
      maxDailyLoss: number;
      maxExposure: number;
      balance: number;
    },
  ) {}

  canTrade(balance: number, proposedRisk: number) {
    const exposureLimit = this.config.balance * this.config.maxExposure;
    if (proposedRisk > exposureLimit) return false;
    if (balance <= 0 || this.config.maxDailyLoss <= 0) return false;
    if (balance < this.config.maxDailyLoss) return false;
    return true;
  }
}
