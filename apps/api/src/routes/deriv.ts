import { Router } from "express";
import { z } from "zod";
import { DerivClient } from "../adapters/deriv/DerivClient.js";
import { env } from "../config/env.js";

const router = Router();
const derivClient = new DerivClient({
  appId: env.derivAppId,
  token: env.derivToken,
  endpoint: env.derivWsUrl,
});

router.get("/markets", async (_, res) => {
  try {
    const markets = await derivClient.getMarkets();
    res.json({ ok: true, data: markets });
  } catch (error) {
    res.status(500).json({ ok: false, message: (error as Error).message });
  }
});

router.get("/account", async (_, res) => {
  try {
    const account = await derivClient.getAccountStatus();
    res.json({ ok: true, data: account });
  } catch (error) {
    res.status(500).json({ ok: false, message: (error as Error).message });
  }
});

router.post("/connect", async (req, res) => {
  const schema = z.object({
    token: z.string().min(1),
    appId: z.number().int().positive().optional(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid Deriv account payload" });
  }

  try {
    derivClient.connect();
    res.json({ ok: true, message: "Deriv account connection request received. Store token server-side in production." });
  } catch (error) {
    res.status(500).json({ ok: false, message: (error as Error).message });
  }
});

router.post("/disconnect", (_, res) => {
  derivClient.disconnect();
  res.json({ ok: true, message: "Deriv connection disconnected." });
});

router.post("/preview", async (req, res) => {
  const schema = z.object({
    symbol: z.string().min(1),
    amount: z.number().positive(),
    duration: z.number().positive().optional(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid order payload" });
  }

  const preview = await derivClient.previewOrder(parsed.data.symbol, parsed.data.amount, parsed.data.duration || 5);
  res.json({ ok: true, data: preview });
});

export { router as derivRouter };
