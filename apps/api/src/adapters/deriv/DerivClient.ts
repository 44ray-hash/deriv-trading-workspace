import WebSocket from "ws";

export interface DerivConnectionConfig {
  appId: number;
  token: string;
  endpoint: string;
}

export class DerivClient {
  private ws: WebSocket | null = null;

  constructor(private readonly config: DerivConnectionConfig) {}

  connect() {
    if (this.ws) return;

    this.ws = new WebSocket(this.config.endpoint);

    this.ws.on("open", () => {
      console.log("Deriv WebSocket connected");
      if (this.config.token) {
        this.ws?.send(JSON.stringify({ authorize: this.config.token }));
      }
    });

    this.ws.on("message", (raw) => {
      const payload = JSON.parse(raw.toString());
      if (payload.error) {
        console.warn("Deriv socket warning:", payload.error.message || payload.error);
      }
    });
  }

  disconnect() {
    this.ws?.close();
    this.ws = null;
  }

  async getMarkets(): Promise<Array<{ symbol: string; displayName: string; type: string }>> {
    return [
      { symbol: "R_100", displayName: "Volatility 100 Index", type: "synthetic" },
      { symbol: "R_50", displayName: "Volatility 50 Index", type: "synthetic" },
      { symbol: "EURUSD", displayName: "Euro / US Dollar", type: "forex" },
      { symbol: "XAGUSD", displayName: "Silver / US Dollar", type: "commodity" },
    ];
  }

  async getAccountStatus() {
    return {
      connected: Boolean(this.config.token && this.config.appId > 0),
      appId: this.config.appId,
      status: this.config.token ? "authorized" : "not-configured",
    };
  }

  async previewOrder(symbol: string, amount: number, duration: number) {
    return {
      symbol,
      amount,
      duration,
      estimatedCost: amount * duration * 0.01,
      status: "preview-only",
      message: "Order preview only. Final execution requires explicit user approval.",
    };
  }
}
