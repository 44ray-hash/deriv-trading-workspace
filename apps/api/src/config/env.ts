import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "development-secret",
  derivAppId: Number(process.env.DERIV_APP_ID || 0),
  derivToken: process.env.DERIV_TOKEN || "",
  derivWsUrl: process.env.DERIV_WS_URL || "wss://ws.deriv.com/websockets/v3",
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/money_maker?schema=public",
};
