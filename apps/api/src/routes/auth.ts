import { Router } from "express";
import { z } from "zod";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid registration payload" });
  }

  return res.json({
    ok: true,
    message: "User registration accepted. Connect your database and persistence layer for production use.",
    data: {
      email: parsed.data.email,
      username: parsed.data.username,
      isEmailVerified: false,
    },
  });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid login payload" });
  }

  return res.json({
    ok: true,
    message: "Login accepted. Server-side session management is required in production.",
    data: {
      token: "demo-token",
      user: {
        email: parsed.data.email,
      },
    },
  });
});

router.post("/logout", (_, res) => {
  res.json({ ok: true, message: "Session revoked." });
});

export { router as authRouter };
