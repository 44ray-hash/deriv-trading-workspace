import { useMemo, useState } from "react";

type Screen = "dashboard" | "markets" | "signals" | "strategies" | "trading" | "admin";

const menu: Array<{ id: Screen; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "markets", label: "Markets" },
  { id: "signals", label: "Signals" },
  { id: "strategies", label: "Strategies" },
  { id: "trading", label: "Trading" },
  { id: "admin", label: "Admin" },
];

const marketRows = [
  { symbol: "R_100", trend: "Bullish", signal: "BUY", confidence: "78%", volume: "$8.4M" },
  { symbol: "EURUSD", trend: "Neutral", signal: "WAIT", confidence: "42%", volume: "$4.7M" },
  { symbol: "XAGUSD", trend: "Bearish", signal: "SELL", confidence: "69%", volume: "$3.9M" },
];

const signalRows = [
  { symbol: "R_100", direction: "BUY", score: 78, stop: 108.4, target: 111.1 },
  { symbol: "EURUSD", direction: "WAIT", score: 42, stop: 1.0762, target: 1.0850 },
  { symbol: "XAGUSD", direction: "SELL", score: 71, stop: 32.80, target: 31.90 },
];

const strategyRows = [
  { name: "Momentum Continuation", mode: "demo", status: "active" },
  { name: "Range Breaker", mode: "signals", status: "draft" },
  { name: "Volatility Snapshot", mode: "semi", status: "review" },
];

const adminRows = [
  { label: "API health", value: "Healthy" },
  { label: "Deriv status", value: "Not configured" },
  { label: "Runs today", value: "14" },
  { label: "Audits", value: "128" },
];

export default function App() {
  const [active, setActive] = useState<Screen>("dashboard");

  const section = useMemo(() => {
    switch (active) {
      case "markets":
        return <MarketsView />;
      case "signals":
        return <SignalsView />;
      case "strategies":
        return <StrategiesView />;
      case "trading":
        return <TradingView />;
      case "admin":
        return <AdminView />;
      default:
        return <DashboardView />;
    }
  }, [active]);

  return (
    <div className="layout-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">M</div>
          <div>
            <h1>Money Maker</h1>
            <span>AI Trading Bot</span>
          </div>
        </div>

        <nav className="nav">
          {menu.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? "nav-button active" : "nav-button"}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mini-card">
          <p>Risk status</p>
          <strong>Analysis mode</strong>
          <span>Live execution disabled by default</span>
        </div>
      </aside>

      <main className="content-panel">
        <header className="topbar">
          <div>
            <small className="eyebrow">Workspace</small>
            <h2>Trading Operations Center</h2>
          </div>
          <button className="primary-button">Deploy Strategy</button>
        </header>

        {section}
      </main>
    </div>
  );
}

function DashboardView() {
  return (
    <>
      <section className="stats-grid">
        <div className="card">
          <span>Balance</span>
          <strong>$12,450.00</strong>
        </div>
        <div className="card">
          <span>Open positions</span>
          <strong>08</strong>
        </div>
        <div className="card">
          <span>Win rate</span>
          <strong>68.2%</strong>
        </div>
        <div className="card">
          <span>Daily P&amp;L</span>
          <strong>+$385.50</strong>
        </div>
      </section>

      <section className="two-column">
        <div className="panel">
          <h3>Market watch</h3>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Trend</th>
                <th>Signal</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketRows.map((row) => (
                <tr key={row.symbol}>
                  <td>{row.symbol}</td>
                  <td>{row.trend}</td>
                  <td className={row.signal === "BUY" ? "signal-up" : row.signal === "SELL" ? "signal-down" : "signal-neutral"}>{row.signal}</td>
                  <td>{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h3>High-confidence signals</h3>
          <div className="signal-list">
            {signalRows.map((row) => (
              <div className="signal-row" key={row.symbol}>
                <div>
                  <strong>{row.symbol}</strong>
                  <span>{row.direction}</span>
                </div>
                <div>
                  <small>Score</small>
                  <strong>{row.score}</strong>
                </div>
                <div>
                  <small>Target</small>
                  <strong>{row.target}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MarketsView() {
  return (
    <section className="panel full-panel">
      <h3>Live market scanner</h3>
      <table>
        <thead>
          <tr>
            <th>Market</th>
            <th>Trend</th>
            <th>Signal</th>
            <th>Risk</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {marketRows.map((row) => (
            <tr key={row.symbol}>
              <td>{row.symbol}</td>
              <td>{row.trend}</td>
              <td>{row.signal}</td>
              <td>{row.signal === "BUY" ? "Medium" : "Low"}</td>
              <td>Now</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SignalsView() {
  return (
    <section className="panel full-panel">
      <h3>Money Maker Signal</h3>
      <div className="signal-stack">
        {signalRows.map((row) => (
          <div key={row.symbol} className="signal-card">
            <header>
              <strong>{row.symbol}</strong>
              <span className={row.direction === "BUY" ? "signal-up" : row.direction === "SELL" ? "signal-down" : "signal-neutral"}>{row.direction}</span>
            </header>
            <p>EMA alignment and momentum show a clear continuation pattern over the selected timeframe.</p>
            <div className="mini-metrics">
              <span>Confidence: {row.score}</span>
              <span>Stop: {row.stop}</span>
              <span>Target: {row.target}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StrategiesView() {
  return (
    <section className="panel full-panel">
      <h3>Strategy library</h3>
      <div className="strategy-list">
        {strategyRows.map((row) => (
          <div key={row.name} className="strategy-card">
            <div>
              <strong>{row.name}</strong>
              <small>{row.mode}</small>
            </div>
            <span className="status-pill">{row.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TradingView() {
  return (
    <section className="two-column">
      <div className="panel">
        <h3>Manual trade</h3>
        <form className="trade-form">
          <label>
            Symbol
            <input defaultValue="R_100" />
          </label>
          <label>
            Side
            <select defaultValue="BUY">
              <option>BUY</option>
              <option>SELL</option>
            </select>
          </label>
          <label>
            Stake
            <input defaultValue="10" />
          </label>
          <button className="primary-button" type="button">Preview Trade</button>
        </form>
      </div>

      <div className="panel">
        <h3>Execution log</h3>
        <ul className="log-list">
          <li>Strategy queued for demo validation.</li>
          <li>Risk gate passed for analysis mode.</li>
          <li>Deriv connection status: not configured.</li>
        </ul>
      </div>
    </section>
  );
}

function AdminView() {
  return (
    <section className="panel full-panel">
      <h3>Administrator dashboard</h3>
      <div className="admin-grid">
        {adminRows.map((row) => (
          <div key={row.label} className="admin-card">
            <small>{row.label}</small>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
