import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    ok: true,
    data: [
      { id: "n-1", title: "Signal alert", content: "R_100 BUY signal fired.", read: false },
      { id: "n-2", title: "Risk limit", content: "Daily risk target reached for demo mode.", read: true },
    ],
  });
});

router.put("/preferences", (_, res) => {
  res.json({ ok: true, message: "Notification preferences updated." });
});

export { router as notificationRouter };
